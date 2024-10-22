from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms import Ollama

app = Flask(__name__)
CORS(app)

catched_llm = Ollama(model="llama3.1")

# Restricción de instrucciones del sistema
system_instruction = """
You are a helpful assistant that only answers questions related to programming, the NetBeans IDE, or its shortcuts. 
If the question is not related to these topics, respond with:
'I can only answer questions about programming, NetBeans IDE, or its shortcuts.'
"""

@app.route("/ai", methods=["POST"])
def aiPost():
    json_content = request.json
    message = json_content.get("message")
    print(f"message: {message}")

    # Combinar la instrucción del sistema con la consulta del usuario
    full_query = f"{system_instruction}\nUser message: {message}"

    # Invocar el modelo con la consulta completa
    response = catched_llm.invoke(full_query)

    response_answer = {
        "response": response
    }
    # return response_answer
    return jsonify(response_answer)

if __name__ == "__main__":
    app.run(debug=True)

