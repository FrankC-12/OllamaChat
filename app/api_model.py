from flask_restx import fields
from .extensions import api

chat_input = api.model("ChatInput", {
    "message": fields.String(required=True, description="The user's message")
})

chat_output = api.model("ChatOutput", {
    "response": fields.String(description="Ollama's response")
})
