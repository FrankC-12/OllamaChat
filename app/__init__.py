from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms import Ollama
from firebase_admin import firestore
from .firebase_config import db
from datetime import datetime, timedelta
import datetime

app = Flask(__name__)
CORS(app)

# app/firebase_config.py



catched_llm = Ollama(model="llama3.1")

# Restricción de instrucciones del sistema
system_instruction = """
You are a helpful assistant that only answers questions related to programming, the NetBeans IDE, or its shortcuts. 
If the question is not related to these topics, respond with:
'I can only answer questions about programming, NetBeans IDE, or its shortcuts.'
"""


# Este endpoint nos permite hablar con el modleo de Ollama 3.1
@app.route("/ai", methods=["POST"])
# Simulando la lógica de invocación del modelo AI
def aiPost():
    json_content = request.json
    message = json_content.get("message")
    print(f"message: {message}")

    # Combinar la instrucción del sistema con la consulta del usuario
    full_query = f"{system_instruction}\nUser message: {message}"

    # Invocar el modelo con la consulta completa (full_query)
    # Aquí se debe hacer la invocación real del modelo de IA. Por ahora se simula la respuesta.
    assistant_response = catched_llm.invoke(full_query)  # Reemplaza esta línea por la invocación real
    print(f"AI response: {assistant_response}")

    # Crear la respuesta JSON
    response_answer = {
        "response": assistant_response
    }

    # Guardar el historial en Firestore
    try:
        doc_ref = db.collection("chatHistory").add({
            "userMessage": message,
            "botResponse": assistant_response,
            "timestamp": firestore.SERVER_TIMESTAMP  # Agrega la marca de tiempo del servidor
        })
        print(f"Historial guardado con ID: {doc_ref.id}")
    except Exception as e:
        print(f"Error guardando el historial: {e}")
    
    # return response_answer
    return jsonify(response_answer)

#Este endpoint hace una consulta a firebase para mostrar el historia de preguv
@app.get("/history/today")
def get_today_history():
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

if __name__ == "__main__":
    app.run(debug=True)

