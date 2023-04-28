from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('api/predict_ff/', views.predict_ff, name='feedforward'),
    path('api/predict_cnn', views.predict_cnn, name='cnn'),
    path('api/login/', auth_views.LoginView.as_view(), name='login'),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
]