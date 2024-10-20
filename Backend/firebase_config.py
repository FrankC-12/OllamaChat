import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("/home/frank/repo/chatbot-6636e-firebase-adminsdk-7k8t2-5c4d9b9807.json")
firebase_admin.initialize_app(cred)
