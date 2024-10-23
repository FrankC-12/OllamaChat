# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("app/credentials.json")
# firebase_admin.initialize_app(cred)

import firebase_admin
from firebase_admin import credentials, firestore


# Inicializa la aplicación de Firebase
cred = credentials.Certificate("app/chatbot-e10ff-firebase-adminsdk-o5erg-523c589a7a.json")
firebase_admin.initialize_app(cred)

# Inicializa el cliente de Firestore
db = firestore.client()
