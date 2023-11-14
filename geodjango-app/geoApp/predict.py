
import pandas as pd
import joblib

# Load the saved model and encoder
model = joblib.load('activity_predictor.joblib')
name_encoder = joblib.load('name.joblib')
activity_encoder = joblib.load('activity.joblib')

# Define the new input data
name = 'pipe2'
date = pd.to_datetime('2023-11-22')

# Fit the name_encoder with the training data
train_data = pd.read_csv('pipes.csv')
name_encoder.fit(train_data['names'])

# Encode the input data
name_encoded = name_encoder.transform([name])[0]
year = date.year
month = date.month
day = date.day
day_of_week = date.dayofweek

# Make a prediction using the loaded model
activity_encoded = model.predict([[name_encoded, year, month, day, day_of_week]])[0]
activity = activity_encoder.inverse_transform([activity_encoded])[0]

# Print the predicted activity
print(f"The predicted activity for {name} on {date.date()} is {activity}")
