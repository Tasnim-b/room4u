from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

# Create your models here.

class role(models.TextChoices):
    chercheur = 'chercheur'
    proprietaire = 'proprietaire'

class Sexe(models.TextChoices):
    HOMME = 'Homme'
    FEMME =  'Femme'
    

class TypeLogement(models.TextChoices):
    studio =  'Studio'
    appartement =  'Appartement'
    coliving =  'Coliving'
    chambre =  'Chambre individuelle'
    etage_villa='Etage de villa'
    residence='Résidence'

class Commodite(models.TextChoices):
    wifi = 'Wifi'
    parking =  'Parking'
    climatisation =  'Climatisation'
    ascenseur='Ascenseur'
    jardin='Jardin'
    garage='Garage'
    machine_a_laver='Machine à laver'
    accessibilite_handicape='Accessibilité handicapé'
    balcon='Balcon'

class Regles(models.TextChoices):
    fille_uniquement='Fille uniquement'
    garcon_uniquement='Garçon uniquement'
    fumeur_accepte='Fumeur accepté'
    non_fumeur_accepte='Non fumeur accepté'
    animaux_acceptes='Animaux acceptés'
    animaux_non_acceptes='Animaux non acceptés'

class PositionSociale(models.TextChoices):
    etudiant='Etudiant(e)'
    retraite='Retraité(e)'
    salari='Salarié(e)'
    chomeur='Chômeur(e)'

class acceptation(models.TextChoices):
    oui = 'Oui'
    non = 'Non'
class preferences(models.TextChoices):
    Musique ='Musique'
    Sport = 'Sport'
    Lecture = 'Lecture'
    Cuisine = 'Cuisine'
    Cinema = 'Cinema'
    Video_games = 'Video games'
    Casanier='Casanier'
    Aventurier='Aventurier'
    Artiste='Artiste'
    Extraverti='Extraverti'
    Introverti='Introverti'
    Communicatif='Communicatif'
    Solitaire='Solitaire'
    Calme='Calme'
    Sérieux='Sérieux'
    Amical='Amical'

class reveil(models.TextChoices):
    Tot='Tot'
    Normal='Normal'
    Tard='Tard'

class frequence(models.TextChoices):
    Rarement='Rarement' 
    Occasionnelemnt='Occasionnelement'
    Souvent='Souvent'
    Jamais='Jamais'

class proprote(models.TextChoices):
    Peu_important='Peu important'
    Important='Important'
    Très_important='Très important'
   
class planning(models.TextChoices):
    Flexible='Flexible'
    Prefere_un_planning='Préfére un planning'
    Indifferement='Indifferement'

class ambiance(models.TextChoices):
    Tres_calme='Trés calme'
    Calme='Calme'
    Ambiance_vivante='Ambiance vivente'

class menage(models.TextChoices):
    Rarement='Rarement' 
    quotidien='Quotidien'
    hebdomadaire='Hebdomadaire'

class typeAnnonce(models.TextChoices):
    Annonce_proprietaire='Annonce Propriétaire'
    Annonce_chercheur_chambre='Annonce Chercheur Chambre'
    Annonce_proposeur_chambre='Annonce Proposeur Chambre'









class User(AbstractUser):
      # Remplacer le username par l'email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    nom=models.CharField(max_length=15)
    prenom=models.CharField(max_length=15)
    email=models.EmailField(unique=True)
    sexe=models.CharField(max_length=5, choices=Sexe.choices)
    date_de_naissance=models.DateField()
    avatar=models.ImageField(null=False,blank=False,upload_to='photos_chercheurs/')
    role= models.CharField(max_length=20, choices=role.choices)
    username = None


#getion des annonces 
class Annonce(models.Model):
    gouvernorat=models.CharField(max_length=20)
    delegation=models.CharField(max_length=20)
    phone=models.CharField(max_length=15)
    description=models.TextField(null=True)
    date_pub_annonce=models.DateField()
    type_annonce = models.CharField(max_length=30, choices=typeAnnonce.choices)
    class Meta: 
        abstract=True


  

class AnnonceProprietaire(Annonce):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='annonces_proprietaire')
    type_de_logement = models.CharField(max_length=30, choices=TypeLogement.choices)
    nombre_pieces = models.PositiveIntegerField()
    superficie = models.PositiveIntegerField(help_text="en m²")
    photo_de_maison = models.ImageField(upload_to='photos_logements/')
    commodites = models.CharField(max_length=50,choices=Commodite.choices)
    regles = models.CharField(max_length=50,choices=Regles.choices)
    date_de_disponibilite = models.DateField()
    loyer = models.DecimalField(max_digits=10, decimal_places=2)
    caution = models.DecimalField(max_digits=10, decimal_places=2)
    meuble = models.CharField(max_length=5,choices=acceptation.choices)
    colocataire_déjà_existant=models.PositiveIntegerField()
    

    def __str__(self):
        return f"Annonce de {self.user.nom}"



class AnnonceColcChercheur(Annonce):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='annonces_colocateur_chercheur')
    budget_max=models.DecimalField(max_digits=10, decimal_places=2)
    occupation=models.CharField(max_length=15,choices=PositionSociale.choices)
    age=models.PositiveIntegerField()
    date_habite=models.DateField()
    preferences=models.CharField( max_length=20,choices=preferences.choices)



class AnnonceColocProposeur(Annonce):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='annonces_colocateur_proposeur')
    photo_de_chambre=models.ImageField(upload_to='photos_logements/')
    loyer=models.DecimalField(max_digits=10, decimal_places=2)
    caution=models.DecimalField(max_digits=10, decimal_places=2)
    date_de_disponibilite=models.DateField()





#matching########################################################################
class FomulaireTestCompatibilite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='formulaire_test_compatibilé')
    horaire_de_reveil=models.CharField(choices=reveil.choices)
    horaire_de_coucher=models.CharField(choices=reveil.choices)
    fréquence_sortie_nocturne=models.CharField(choices=frequence.choices)
    fréquence_invitation_amis=models.CharField(choices=frequence.choices)
    fréquence_consommation_alcool=models.CharField(choices=frequence.choices)
    fréquence_de_menage=models.CharField(choices=menage.choices)
    niveau_exigence_proprote=models.CharField(choices=proprote.choices)
    attitude_partage_taches=models.CharField(choices=planning.choices)
    preference_niveau_sonore=models.CharField(choices=ambiance.choices)
    sensibilite_bruit=models.CharField(choices=proprote.choices)
    preferences=models.CharField(choices=preferences.choices)



class Matching(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchings_as_user1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchings_as_user2')
    score = models.PositiveIntegerField()
    compatibilite_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user1', 'user2')  # éviter les doublons





# ----------------------
# MESSAGERIE
# ----------------------

class Message(models.Model):
    expediteur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_envoyes')
    destinataire = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_recus')
    contenu = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)
    def marquer_comme_lu(self):
        self.lu = True
        self.save()
    

    def __str__(self):
        return f"De {self.expediteur.nom} à {self.destinataire.nom} - {self.date_envoi.strftime('%d/%m/%Y %H:%M')}"
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    link = models.URLField(null=True, blank=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=20, choices=[
        ('NEW_HOUSING', 'Nouvelle annonce'),
        ('NEW_MATCH', 'Nouveau match'),
        ('MESSAGE', 'Nouveau message'),
    ])

class Favoris(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favoris')
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    housing = GenericForeignKey('content_type', 'object_id')
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
