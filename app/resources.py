from flask_restx import Resource, Namespace
from flask import request, jsonify
from .api_model import chat_input, chat_output

ns = Namespace("api") 

OLLAMA_API_URL = "http://localhost:11434/"

@ns.route('/chat', methods=['POST'])
class Chat(Resource):
    from flask_restx import Resource, Namespace
from flask import request, jsonify
import requests  # Esta es la librería correcta para hacer solicitudes HTTP
from .api_model import chat_input, chat_output

    
    

    
    

    

    