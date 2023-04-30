import tensorflow as tf
from tensorflow.keras import models
import json
from django.http import JsonResponse
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.decorators import permission_classes, api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework.authtoken.models import Token


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Username and password are required"}, status=400)

        try:
            user = User.objects.create_user(username=username, password=password)
        except IntegrityError:
            return Response({"detail": "Username already exists"}, status=400)

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "username": user.username})
        else:
            return Response({"detail": "Invalid username or password"}, status=400)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def predict_ff(request):
    model = models.load_model("/Users/joshparina/personal_project/mnist/neural_network_models/mnist_model.h5")
    data = json.loads(request.body)
    image_data = np.expand_dims(data['tensor'], axis=0)

    predicted_number = np.argmax(model.predict(image_data))

    return JsonResponse({"predictedNumber": int(predicted_number)})


@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def predict_cnn(request):
    model = models.load_model("/Users/joshparina/personal_project/mnist/neural_network_models/cnn_model.h5")

    data = json.loads(request.body)
    image_data = np.expand_dims(data['tensor'], axis=0)
    prediction = model.predict(image_data)
    print(prediction)
    predicted_number = np.argmax(prediction)

    return JsonResponse({"predictedNumber": int(predicted_number)})

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def predict_cnn2(request):
    model = models.load_model("/Users/joshparina/personal_project/mnist/neural_network_models/cnn_model2.h5")

    data = json.loads(request.body)
    image_data = np.expand_dims(data['tensor'], axis=0)
    prediction = model.predict(image_data)
    print(prediction)
    predicted_number = np.argmax(prediction)

    return JsonResponse({"predictedNumber": int(predicted_number)})
