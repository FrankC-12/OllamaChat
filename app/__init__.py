from flask import Flask, request
from langchain_community.llms import Ollama


app = Flask(__name__)

catched_llm = Ollama(model="llama3.1")

@app.route("/ai", methods=["POST"])
def aiPost():
    json_content = request.json
    query = json_content.get("query")
    print(f"query: {query}")

    response = catched_llm.invoke(query)

    response_answer = {
        "response": response
    }
    return response_answer

    

    

    
    





if __name__ == "__main__":
    app.run(debug=True)

