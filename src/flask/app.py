from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas as rotas

# Rota de teste
@app.route('/')
def home():
    return "Hello, Flaskoooo!"

# Rota para processamento
@app.route('/process', methods=['POST'])
def process():
    data = request.json  # Obtém o JSON da solicitação
    # Aqui você processaria os dados ou chamaria outra API
    result = {"status": "success", "data": data}
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
