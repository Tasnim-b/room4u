from datetime import date
from rest_framework import serializers
from .models import PositionSociale, User, Message,Notification, AnnonceColcChercheur,AnnonceProprietaire,AnnonceColocProposeur,Favoris,Matching,FomulaireTestCompatibilite, typeAnnonce, preferences
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from django.core.files.base import ContentFile
from django.utils import timezone
from .models import Conversation, Message

#authetification 
User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'nom', 'prenom', 'sexe', 'date_de_naissance', 'avatar', 'role']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # hash du mot de passe
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ajouter l'URL de redirection selon le rôle
        if instance.role == 'proprietaire':
            data['redirect_url'] = '/Dashboard'
        else:  # chercheur
            data['redirect_url'] = '/DashboardColc'
        return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajout de données personnalisées dans le payload JWT
        token['email'] = user.email
        token['role'] = user.role
        token['nom'] = user.nom
        token['prenom'] = user.prenom
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'nom', 'prenom', 'sexe', 'date_de_naissance', 'avatar', 'role']

class UserSerializerupdate(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'nom', 'prenom', 'sexe', 'date_de_naissance', 'avatar', 'role', 'password']

    def update(self, instance, validated_data):
        # Traitement du mot de passe uniquement s'il est fourni
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
#user internaute
class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'prenom', 'age','avatar','sexe']

# Serializer pour l'utilisateur authentifié
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'

# Serializer pour l’annonce du propriétaire
class AnnonceProprietaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnonceProprietaire
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        # L'utilisateur sera injecté dans la view avec serializer.save(user=...)
        return super().create(validated_data)

# Serializer pour l’annonce chercheur
class AnnonceColcChercheurSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    occupation = serializers.ChoiceField(choices=PositionSociale.choices)
    preferences = serializers.ChoiceField(choices=preferences.choices)
    type_annonce = serializers.ChoiceField(choices=typeAnnonce.choices, read_only=True)
    preferences = serializers.ListField(
    child=serializers.ChoiceField(choices=preferences.choices),
    required=False
)
    class Meta:
        model = AnnonceColcChercheur
        fields = '__all__'
        read_only_fields = ['user', 'date_pub_annonce', 'type_annonce', 'age']

    def create(self, validated_data):
        user = self.context['request'].user
        today = date.today()
        dob = user.date_de_naissance
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

        validated_data['user'] = user
        validated_data['date_pub_annonce'] = timezone.now().date()
        validated_data['type_annonce'] = typeAnnonce.Annonce_chercheur_chambre
        validated_data['age'] = age

        return super().create(validated_data)
    
# Serializer pour l’annonce proposeur
class AnnonceColocProposeurSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    class Meta:
        model = AnnonceColocProposeur
        fields = '__all__'  
        read_only_fields = ['user', 'date_pub_annonce', 'type_annonce']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['date_pub_annonce'] = timezone.now().date()
        validated_data['type_annonce'] = typeAnnonce.Annonce_proposeur_chambre
        return super().create(validated_data)
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo_de_chambre and request:
            return request.build_absolute_uri(obj.photo_de_chambre.url)
        return None

# Serializer pour le formulaire de compatibilité
class FomulaireTestCompatibiliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FomulaireTestCompatibilite
        fields = '__all__'

# Serializer pour le Matching
class MatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matching
        fields = '__all__'

# Serializer pour les messages
class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True)
    conversation = serializers.PrimaryKeyRelatedField(read_only=True)
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'sender_name', 'text', 'timestamp', 'is_read']

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    participants_info = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'participants_info', 'created_at', 'last_message']

    def get_last_message(self, obj):
        last = obj.messages.order_by('-timestamp').first()
        return MessageSerializer(last).data if last else None

    def get_participants_info(self, obj):
        return [
            {"id": u.id, "nom": u.first_name, "prenom": u.last_name, "email": u.email}
            for u in obj.participants.all()
        ]

# Serializer pour les notifications
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# Serializer pour les favoris (GenericForeignKey)
class FavorisSerializer(serializers.ModelSerializer):
    housing_data = serializers.SerializerMethodField()
    class Meta:
        model = Favoris
        fields = '__all__'

    def get_housing_data(self, obj):
        return str(obj.housing)  # Vous pouvez affiner selon le modèle


#serializer unifié de toutes les annonces :

class AnnonceUnifiedSerializer(serializers.Serializer):#serializer vu qu'on fusionner 3 type de modéles dans serializer smple
    id = serializers.IntegerField()
    gouvernorat = serializers.CharField()
    delegation = serializers.CharField()
    phone = serializers.CharField()
    description = serializers.CharField()
    type_annonce = serializers.CharField()
    user = UserSerializer(read_only=True)
    type = serializers.SerializerMethodField()
    extra_fields = serializers.SerializerMethodField()

    def get_type(self, obj):
        if isinstance(obj, AnnonceProprietaire):
            return "proprietaire"
        elif isinstance(obj, AnnonceColocProposeur):
            return "coloc_proposeur"
        elif isinstance(obj, AnnonceColcChercheur):
            return "coloc_chercheur"
        return "inconnu"

    def get_extra_fields(self, obj):
        if isinstance(obj, AnnonceProprietaire):
            return {
                "type_de_logement": obj.type_de_logement,
                "nombre_pieces": obj.nombre_pieces,
                "superficie": obj.superficie,
                "photo_de_maison": obj.photo_de_maison.url if obj.photo_de_maison else None,
                "commodites": obj.commodites,
                "regles": obj.regles,
                "date_de_disponibilite": obj.date_de_disponibilite,
                "loyer": obj.loyer,
                "caution": obj.caution,
                "meuble": obj.meuble,
                "colocataire_déjà_existant": obj.colocataire_déjà_existant,
            }

        elif isinstance(obj, AnnonceColocProposeur):
            return {
                "photo_de_chambre": obj.photo_de_chambre.url if obj.photo_de_chambre else None,
                "loyer": obj.loyer,
                "caution": obj.caution,
                "date_de_disponibilite": obj.date_de_disponibilite,
            }

        elif isinstance(obj, AnnonceColcChercheur):
            return {
                "budget_max": obj.budget_max,
                "occupation": obj.occupation,
                "age": obj.age,
                "date_habite": obj.date_habite,
                "preferences": obj.preferences,
            }

        return {}