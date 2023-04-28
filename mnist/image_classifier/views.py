from django.shortcuts import render
import tensorflow as tf
from tensorflow.keras import models
import json
from django.http import JsonResponse
import numpy as np
from django.views.decorators.csrf import csrf_exempt

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
        
        predicted_number = np.argmax(model.predict(image_data))
        
        return JsonResponse({"predictedNumber" : int(predicted_number)})
    
    else:
        return JsonResponse({'error' : 'Invalid request method'}, status=400)