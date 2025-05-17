from django.shortcuts import render
from rest_framework import viewsets
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from .models import AnnonceColocProposeur,AnnonceColcChercheur,AnnonceProprietaire,Message
from .serializers import AnnonceUnifiedSerializer, AnnonceColcChercheurSerializer,AnnonceColocProposeurSerializer, AnnonceProprietaireSerializer,MessageSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import AnnonceProprietaireFilter, AnnonceColcChercheurFilter,AnnonceColocProposeurFilter
# Create your views here.


#gestion des annonces ####################################################################
#création des annonces par type 

# ViewSet pour les annonces des propriétaires
class AnnonceProprietaireViewSet(viewsets.ModelViewSet):
    queryset = AnnonceProprietaire.objects.all()
    serializer_class = AnnonceProprietaireSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = AnnonceProprietaireFilter



    def perform_create(self, serializer):
        """Associe automatiquement l'utilisateur connecté à l'annonce."""
        serializer.save(user=self.request.user)

# ViewSet pour les annonces des colocataires chercheurs
class AnnonceColcChercheurViewSet(viewsets.ModelViewSet):
    queryset = AnnonceColcChercheur.objects.all()
    serializer_class = AnnonceColcChercheurSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = AnnonceColcChercheurFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ViewSet pour les annonces des colocataires proposeurs
class AnnonceColocProposeurViewSet(viewsets.ModelViewSet):
    queryset = AnnonceColocProposeur.objects.all()
    serializer_class = AnnonceColocProposeurSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]#Les annonces ne peuvent être créées que par des utilisateurs connectés 
    filter_backends = [DjangoFilterBackend]
    filterset_class = AnnonceColocProposeurFilter


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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