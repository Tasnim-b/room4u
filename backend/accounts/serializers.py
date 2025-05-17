from rest_framework import serializers
from .models import User, Message,Notification, AnnonceColcChercheur,AnnonceProprietaire,AnnonceColocProposeur,Favoris,Matching,FomulaireTestCompatibilite
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

#user internaute
class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'prenom', 'age','avatar','sexe']

# Serializer pour l'utilisateur authentifié
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# Serializer pour l’annonce du propriétaire
class AnnonceProprietaireSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = AnnonceProprietaire
        fields = '__all__'
    def get_user(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return UserSerializer(obj.user).data
        return UserPublicSerializer(obj.user).data

# Serializer pour l’annonce chercheur
class AnnonceColcChercheurSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = AnnonceColcChercheur
        fields = '__all__'

    def get_user(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return UserSerializer(obj.user).data
        return UserPublicSerializer(obj.user).data
    
# Serializer pour l’annonce proposeur
class AnnonceColocProposeurSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = AnnonceColocProposeur
        fields = '__all__'
    def get_user(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return UserSerializer(obj.user).data
        return UserPublicSerializer(obj.user).data

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
    class Meta:
        model = Message
        fields = '__all__'

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