from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AnnonceUnifiedListView,CustomTokenObtainPairView,TokenRefreshView
from .views import RegisterView, CustomTokenObtainPairView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('annonces/', AnnonceUnifiedListView.as_view(), name='annonces-unifiees'),
        # Authentification
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # path('api/register/', register_user),
    # path('api/login/', login_user),
    # path('api/logout/', LogoutView.as_view()),
    # path('api/', include(router.urls)),  # URL principale pour l'API
    #  # Auth routes
    # path('auth/register/', RegisterView.as_view(), name='register'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
