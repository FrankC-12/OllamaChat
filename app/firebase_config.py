# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("app/credentials.json")
# firebase_admin.initialize_app(cred)

# import firebase_admin
# from firebase_admin import credentials, firestore


# # Inicializa la aplicación de Firebase
# cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS")
# firebase_admin.initialize_app(cred)

# # Inicializa el cliente de Firestore
# db = firestore.client()


from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Cargar las variables del archivo .env
load_dotenv()

# Obtener la ruta de las credenciales desde la variable de entorno
cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')

# Asegurarse de que la variable está definida
if not cred_path:
    raise Exception("No se ha encontrado la variable de entorno GOOGLE_APPLICATION_CREDENTIALS")

# Inicializa la aplicación de Firebase con las credenciales
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Inicializa el cliente de Firestore
db = firestore.client()



