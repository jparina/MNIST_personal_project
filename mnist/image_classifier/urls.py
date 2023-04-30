from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('api/predict_ff/', views.predict_ff, name='feedforward'),
    path('api/predict_cnn/', views.predict_cnn, name='cnn'),
    path('api/predict_cnn2/', views.predict_cnn2, name='cnn2'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]