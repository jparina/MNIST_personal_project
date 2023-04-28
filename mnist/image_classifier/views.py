from django.shortcuts import render
import tensorflow as tf
from tensorflow.keras import models
import json
from django.http import JsonResponse
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        User.objects.create_user(**serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
def predict_ff(request):
    if request.method == 'POST':
        model = models.load_model("/Users/joshparina/personal_project/mnist/neural_network_models/mnist_model.h5")
        data = json.loads(request.body)
        image_data = np.expand_dims(data['tensor'], axis=0)
        
        predicted_number = np.argmax(model.predict(image_data))
        
        return JsonResponse({"predictedNumber" : int(predicted_number)})
        
    else:
        return JsonResponse({'error' : 'Invalid request method'}, status=400)
    
@csrf_exempt
def predict_cnn(request):
    if request.method == 'POST':
        model = models.load_model("/Users/joshparina/personal_project/mnist/neural_network_models/cnn_model.h5")
        
        data = json.loads(request.body)
        image_data = np.expand_dims(data['tensor'], axis=0)
        prediction = model.predict(image_data)
        print(prediction)
        predicted_number = np.argmax(prediction)
        
        return JsonResponse({"predictedNumber" : int(predicted_number)})
    
    else:
        return JsonResponse({'error' : 'Invalid request method'}, status=400)