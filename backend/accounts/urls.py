from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AnnonceUnifiedListView,CustomTokenObtainPairView,TokenRefreshView
from .views import RegisterView, CustomTokenObtainPairView, LogoutView,AnnonceProprietaireCreateView,CurrentUserView,UserUpdateView
from .views import MesAnnoncesProprietaireListView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('annonces/', AnnonceUnifiedListView.as_view(), name='annonces-unifiees'),
        # Authentification
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('update/', UserUpdateView.as_view(), name='update-user'),
    path('annonces-proprietaire/', AnnonceProprietaireCreateView.as_view(), name='creer_annonce_proprietaire'),
    path('mes-annonces-proprietaire/', MesAnnoncesProprietaireListView.as_view(), name='mes_annonces_proprietaire'),


]
urlpatterns += static(settings.PHOTOS_URL, document_root=settings.PHOTOS_ROOT)
urlpatterns += static(getattr(settings, 'PHOTOS_LOGEMENTS_URL', '/photos_logements/'), document_root=getattr(settings, 'PHOTOS_LOGEMENTS_ROOT', 'photos_logements'))