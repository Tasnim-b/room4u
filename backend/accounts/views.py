from django.shortcuts import render
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from .models import AnnonceColocProposeur,AnnonceColcChercheur,AnnonceProprietaire,Message,User,Conversation,Favoris
from .serializers import AnnonceUnifiedSerializer, AnnonceColcChercheurSerializer,AnnonceColocProposeurSerializer, AnnonceProprietaireSerializer,MessageSerializer,UserSerializer,RegisterSerializer,ConversationSerializer,FavorisSerializer
from .filters import AnnonceProprietaireFilter, AnnonceColcChercheurFilter,AnnonceColocProposeurFilter
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework import permissions
from .serializers import CustomTokenObtainPairSerializer,UserSerializerupdate,AnnonceProprietaireSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import PermissionDenied
from django.db import models
from django.contrib.contenttypes.models import ContentType
# Create your views here.
#gestion de user 
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer l'utilisateur connecté
        user = serializer.user
        

        # Construire la réponse personnalisée
        data = {
            'access': serializer.validated_data['access'],
            'refresh': serializer.validated_data['refresh'],
            'email': user.email,
            'role': user.role,
            'nom': user.nom,
            'prenom': user.prenom,
            # Ajouter l'URL de redirection selon le rôle
            'redirect_url': '/Dashboard' if user.role == 'proprietaire' else '/DashboardColoc'
            
        }

        return Response(data, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        print("Données reçues :", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            
            # Créer une réponse personnalisée avec les données de l'utilisateur
            response_data = serializer.data
            
            return Response(
                response_data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        else:
            print("Erreurs de validation :", serializer.errors)  # Affiche les erreurs dans la console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklister le token refresh
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
#profile de l'utilisateur connecté
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        user = request.user
        serializer = UserSerializerupdate(user, data=request.data, partial=True)  # `partial=True` pour accepter les champs partiels
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
#gestion des annonces ####################################################################
#création des annonces par type 

# ViewSet pour les annonces des propriétaires
class AnnonceProprietaireCreateView(generics.CreateAPIView):
    queryset = AnnonceProprietaire.objects.all()
    serializer_class = AnnonceProprietaireSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Associer automatiquement l'utilisateur connecté
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print("Erreurs de validation :", serializer.errors)  # Affiche les erreurs dans la console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSet pour les annonces des colocataires chercheurs
class AnnonceColcChercheurViewSet(viewsets.ModelViewSet):
    queryset = AnnonceColcChercheur.objects.all()
    serializer_class = AnnonceColcChercheurSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = AnnonceColcChercheurFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ViewSet pour les annonces des colocataires proposeurs
class AnnonceColocProposeurViewSet(viewsets.ModelViewSet):
    queryset = AnnonceColocProposeur.objects.all()
    serializer_class = AnnonceColocProposeurSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        if 'photos' in request.FILES:
            request.data._mutable = True
            request.data['photo_de_chambre'] = request.FILES['photos'][0]  
            request.data._mutable = False
        
        return super().create(request, *args, **kwargs)
#affichages des annonces 
class AnnonceUnifiedListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        proprietaires = AnnonceProprietaire.objects.select_related("user").all()
        proposeurs = AnnonceColocProposeur.objects.select_related("user").all()
        chercheurs = AnnonceColcChercheur.objects.select_related("user").all()

        # Fusionner et trier (facultatif)
        all_annonces = list(proprietaires) + list(proposeurs) + list(chercheurs)

        serializer = AnnonceUnifiedSerializer(all_annonces, many=True)
        return Response(serializer.data)
    

#il me manque le foltrage des annonces


###########""messagerie
class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]  # 🔒 Interdiction si pas connecté

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class MesAnnoncesProprietaireListView(generics.ListAPIView):
    serializer_class = AnnonceProprietaireSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AnnonceProprietaire.objects.filter(user=self.request.user)
        
class ConversationListCreateView(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(participants=self.request.user)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'user_id is required'}, status=400)
        other_user = User.objects.get(id=user_id)
        # Correction : on filtre sur les deux participants avec des .filter() séparés
        conv = Conversation.objects.annotate(num_participants=models.Count('participants'))\
            .filter(num_participants=2)\
            .filter(participants=self.request.user)\
            .filter(participants=other_user)\
            .first()
        if conv:
            serializer = self.get_serializer(conv)
            return Response(serializer.data)
        conv = Conversation.objects.create()
        conv.participants.add(self.request.user, other_user)
        serializer = self.get_serializer(conv)
        return Response(serializer.data, status=201)

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        return Message.objects.filter(conversation_id=conversation_id).order_by('timestamp')

    def perform_create(self, serializer):
        conversation = Conversation.objects.get(id=self.kwargs['conversation_id'])
        if self.request.user not in conversation.participants.all():
            raise PermissionDenied("Vous n'êtes pas dans cette conversation.")
        serializer.save(sender=self.request.user, conversation=conversation)

class AnnonceProprietaireDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnnonceProprietaire.objects.all()
    serializer_class = AnnonceProprietaireSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        # Limite l'accès à ses propres annonces
        return AnnonceProprietaire.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        # Optionnel : vérifier que l'utilisateur est bien le propriétaire
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'detail': "Vous n'êtes pas autorisé à supprimer cette annonce."}, status=403)
        return super().delete(request, *args, **kwargs)

class FavorisCreateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Ajout d'un favori
        user = request.user
        object_id = request.data.get('object_id')
        model_name = request.data.get('model_name')  # 'annonceproprietaire', 'annoncecolocproposeur', 'annoncecolcchercheur'
        if not object_id or not model_name:
            return Response({'error': 'object_id et model_name requis'}, status=400)
        try:
            content_type = ContentType.objects.get(model=model_name)
        except ContentType.DoesNotExist:
            return Response({'error': 'Type de modèle inconnu'}, status=400)
        favori, created = Favoris.objects.get_or_create(user=user, content_type=content_type, object_id=object_id)
        if created:
            return Response({'status': 'added'}, status=201)
        return Response({'status': 'already_exists'}, status=200)

    def delete(self, request):
        # Suppression d'un favori
        user = request.user
        object_id = request.data.get('object_id')
        model_name = request.data.get('model_name')
        if not object_id or not model_name:
            return Response({'error': 'object_id et model_name requis'}, status=400)
        try:
            content_type = ContentType.objects.get(model=model_name)
        except ContentType.DoesNotExist:
            return Response({'error': 'Type de modèle inconnu'}, status=400)
        Favoris.objects.filter(user=user, content_type=content_type, object_id=object_id).delete()
        return Response({'status': 'deleted'}, status=204)

class FavorisUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favoris = Favoris.objects.filter(user=request.user).order_by('-created_at')
        result = []
        for fav in favoris:
            housing = fav.housing
            # Sérialisation complète selon le type d'annonce
            if hasattr(housing, 'type_de_logement'):
                serializer = AnnonceProprietaireSerializer(housing, context={'request': request})
                annonce_type = 'proprietaire'
            elif hasattr(housing, 'photo_de_chambre'):
                serializer = AnnonceColocProposeurSerializer(housing, context={'request': request})
                annonce_type = 'coloc_proposeur'
            else:
                serializer = AnnonceColcChercheurSerializer(housing, context={'request': request})
                annonce_type = 'coloc_chercheur'
            result.append({
                'id': fav.id,
                'housing': serializer.data,
                'annonce_type': annonce_type,
                'created_at': fav.created_at
            })
        return Response(result)