from django.shortcuts import render
import tensorflow as tf
from tensorflow.keras import models
import json
from django.http import JsonResponse
import numpy as np
# Create your views here.

def home(request):
    return render(request, "insert html file to render")
