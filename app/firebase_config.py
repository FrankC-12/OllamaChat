# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("app/credentials.json")
# firebase_admin.initialize_app(cred)

import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import os

load_dotenv()

cred = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
firebase_admin.initialize_app(cred)

# Inicializa el cliente de Firestore
db = firestore.client()
