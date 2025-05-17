from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AnnonceUnifiedListView
from rest_framework_simplejwt.views import TokenRefreshView

# Crée un router DRF
# router = DefaultRouter()

# Enregistre les vues dans le router
# router.register(r'users', views.UserViewSet)
# router.register(r'profiles', views.ProfileChercheurViewSet)
# router.register(r'annonces', views.AnnonceLogementViewSet)
# router.register(r'messages', views.MessageViewSet)

urlpatterns = [
    path('annonces/', AnnonceUnifiedListView.as_view(), name='annonces-unifiees'),
    # path('api/', include(router.urls)),  # URL principale pour l'API
    #  # Auth routes
    # path('auth/register/', RegisterView.as_view(), name='register'),
    # path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
