from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_reasoning import explain_with_gemini

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    try:
        payload = request.json
        result = explain_with_gemini(payload)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)