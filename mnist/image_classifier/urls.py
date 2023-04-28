from django.urls import path, include
from . import views


urlpatterns = [
    path('api/predict_ff/', views.predict_ff, name='feedforward'),
    path('api/predict_cnn/', views.predict_cnn, name='cnn'),
    path('api/login/', views.login_view, name='login'),
    path('api/register/', views.register, name='register'),
    
]