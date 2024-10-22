from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama
from firebase_admin import firestore
from datetime import datetime, timedelta
from pydantic import BaseModel

app = FastAPI()
chat_history = []

class Message(BaseModel):

    message: str



app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chatbot-6636e.web.app/"],  # Cambia esto por la URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.get("/")
async def read_root():
    return {"message": "API is running. Use the /chat endpoint to send messages."}




from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx



# Definir un modelo de datos para la solicitud (mensaje)
class MessageRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(message_request: MessageRequest):
    user_message = message_request.message

    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Instrucción clara para el modelo Ollama
    system_instruction = """
    You are a helpful assistant that only answers questions related to programming, the NetBeans IDE, or its shortcuts. 
    If the question is not related to these topics, respond with:
    'I can only answer questions about programming, NetBeans IDE, or its shortcuts.'
    """

    # Preparar el payload para enviar a Ollama
    payload = {
        "model": "llama3.1",  # O el nombre del modelo que estás utilizando en Ollama
        "messages": [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_message}
        ],
        "stream": False
    }

    try:
        # Llamada a Ollama a través de su API REST
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{OLLAMA_API_URL}/chat", json=payload)
            response.raise_for_status()

        # Extraer la respuesta del modelo
        ollama_response = response.json()
        assistant_message = ollama_response.get("message", {}).get("content", "No response from model")

        return {"response": assistant_message}

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Error with Ollama service")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# @app.get("/history/today")
# async def get_today_history():
#     try:
#         # Obtener la fecha de hoy
#         today_start = datetime.combine(datetime.today(), datetime.min.time())
#         today_end = today_start + timedelta(days=1)
        
#         # Consultar en Firestore los documentos cuya fecha esté entre el rango de hoy
#         chat_history_ref = db.collection("chatHistory")
#         query = chat_history_ref.where("timestamp", ">=", today_start).where("timestamp", "<", today_end)
#         docs = query.stream()

#         history = []
#         for doc in docs:
#             doc_data = doc.to_dict()
#             history.append({
#                 "userMessage": doc_data.get("userMessage"),
#                 "botResponse": doc_data.get("botResponse"),
#                 "timestamp": doc_data.get("timestamp").isoformat() if doc_data.get("timestamp") else None
#             })
        
#         return {"history": history}
    
#     except Exception as e:
#         return {"error": f"Error al obtener el historial: {e}"}