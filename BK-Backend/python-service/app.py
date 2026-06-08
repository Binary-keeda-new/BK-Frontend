"""
ATS Python Service — Flask API
Runs on port 5001 (configurable via PYTHON_SERVICE_PORT env var)

Endpoints:
  POST /ats/skill-match    — Standard skill-based ATS matching (spaCy + skillNer)
  POST /ats/ai-analysis    — AI-powered ATS analysis (Gemini 2.5 Flash)
  POST /pdf/extract        — PDF text extraction (PyMuPDF)
  GET  /                   — Health check

Startup:
  cd python-service
  pip install -r requirements.txt
  python -m spacy download en_core_web_md
  python app.py
"""

import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from ats import load_models, match_skills
from text_extract import extract_pdf_text
from ai_ats import run_ats as run_ai_ats

# Load .env from this directory (fallback to parent backend .env)
load_dotenv()
if not os.getenv("GEMINI_API_KEY"):
    parent_env = os.path.join(os.path.dirname(__file__), '..', '.env')
    load_dotenv(parent_env)

app = Flask(__name__)

# CORS: allow your frontend origins
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://binarykeeda.com",
    "https://www.binarykeeda.com",
]}},
     supports_credentials=True,
     methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"])

# ---------------------------
# Load matchers once at startup
# ---------------------------
print("[ATS Python Service] Loading NLP models...")
full_matcher, abv_matcher, full_uni_matcher, low_form_matcher, token_matcher = load_models()
print("[ATS Python Service] Models loaded successfully.")


def match_skills_cached(data):
    return match_skills(
        data,
        full_matcher=full_matcher,
        abv_matcher=abv_matcher,
        full_uni_matcher=full_uni_matcher,
        low_form_matcher=low_form_matcher,
        token_matcher=token_matcher
    )



# Routes

@app.route("/")
def home():
    return jsonify({"status": "ok", "service": "ATS Python Service"}), 200


@app.route('/ats/skill-match', methods=["POST"])
def ats_route():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "No JSON body received"}), 400
    try:
        result = match_skills_cached(data)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/pdf/extract', methods=["POST"])
def extract_text():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    try:
        result = extract_pdf_text(file)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/ats/ai-analysis", methods=["POST"])
def ai_ats_route():
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON body required"}), 400

    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")

    if not resume_text or not job_description:
        return jsonify({"error": "resume_text and job_description required"}), 400

    try:
        result = run_ai_ats(resume_text, job_description)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Main

if __name__ == "__main__":
    port = int(os.getenv("PYTHON_SERVICE_PORT", 5001))
    print(f"[ATS Python Service] Starting on port {port}")
    app.run(debug=True, host="0.0.0.0", port=port)
