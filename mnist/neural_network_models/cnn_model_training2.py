import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train, x_test = x_train / 255.0, x_test / 255.0
y_train, y_test = to_categorical(y_train), to_categorical(y_test)

cnn_model = models.Sequential([
    layers.Input(shape=(28, 28, 1)),
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

cnn_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.5,
    height_shift_range=0.3,
    zoom_range=0.1
)

datagen.fit(x_train[..., np.newaxis])
history = cnn_model.fit(datagen.flow(x_train[..., np.newaxis], y_train, batch_size=32),
                        epochs=10,
                        validation_data=(x_test[..., np.newaxis], y_test))

test_loss, test_accuracy = cnn_model.evaluate(x_test[..., np.newaxis], y_test)

print(f"Test Accuracy: {test_accuracy}, Test Loss: {test_loss}")

cnn_model.save('cnn_model2.h5')