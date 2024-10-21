from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import ollama
from firebase_admin import firestore
from datetime import datetime, timedelta

app = FastAPI()
chat_history = []


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

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_message = body.get("message")

    # Instrucción clara para que Ollama solo responda preguntas sobre NetBeans y programación
    system_instruction = """
    You are a helpful assistant that only answers questions related to programming, the NetBeans IDE, or its shortcuts. 
    If the question is not related to these topics, respond with:
    'I can only answer questions about programming, NetBeans IDE, or its shortcuts.'
    """

    if user_message:
        messages = [
            {"role": "system", "content": system_instruction},  # Instrucción para el modelo
            {"role": "user", "content": user_message}            # Pregunta del usuario
        ]

        # Llamar al modelo Ollama para obtener la respuesta
        response = ollama.chat(model='llama3.1', stream=False, messages=messages)
        assistant_response = response.get("message", {}).get("content", "No response from model")

        # Guardar el mensaje del usuario y la respuesta del bot en el historial
        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "bot", "content": assistant_response})

        # # Guardar el historial en Firebase Firestore
        # try:
        #     doc_ref = db.collection("chatHistory").add({
        #         "userMessage": user_message,
        #         "botResponse": assistant_response,
        #         "timestamp": firestore.SERVER_TIMESTAMP
        #     })
        #     print(f"Historial guardado con ID: {doc_ref.id}")
        # except Exception as e:
        #     print(f"Error guardando el historial: {e}")

        # return {"response": assistant_response, "chat_history": chat_history}

    return {"response": "No message provided."}

@app.get("/history/today")
async def get_today_history():
    try:
        # Obtener la fecha de hoy
        today_start = datetime.combine(datetime.today(), datetime.min.time())
        today_end = today_start + timedelta(days=1)
        
        # Consultar en Firestore los documentos cuya fecha esté entre el rango de hoy
        chat_history_ref = db.collection("chatHistory")
        query = chat_history_ref.where("timestamp", ">=", today_start).where("timestamp", "<", today_end)
        docs = query.stream()

        history = []
        for doc in docs:
            doc_data = doc.to_dict()
            history.append({
                "userMessage": doc_data.get("userMessage"),
                "botResponse": doc_data.get("botResponse"),
                "timestamp": doc_data.get("timestamp").isoformat() if doc_data.get("timestamp") else None
            })
        
        return {"history": history}
    
    except Exception as e:
        return {"error": f"Error al obtener el historial: {e}"}