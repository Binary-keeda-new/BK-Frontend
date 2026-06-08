# ATS Python Service

Flask-based microservice that powers the ATS analysis features.

## Setup

```bash
cd python-service

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Download spaCy model (required, ~40MB)
python -m spacy download en_core_web_md

# Set your Gemini API key
# Option 1: Add GEMINI_API_KEY to ../. env (parent backend .env)
# Option 2: Copy .env.example to .env and fill in your key

# Start the service
python app.py
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/ats/skill-match` | Standard ATS skill matching |
| POST | `/ats/ai-analysis` | AI-powered ATS analysis (Gemini) |
| POST | `/pdf/extract` | PDF text extraction |

## Architecture

```
python-service/
├── app.py           # Flask server (port 5001)
├── ats.py           # Standard ATS — spaCy + skillNer
├── ai_ats.py        # AI ATS — Gemini 2.5 Flash
├── text_extract.py  # PDF text extraction — PyMuPDF
├── requirements.txt # Python dependencies
├── .env.example     # Environment variables template
└── README.md        # This file
```

The Node.js backend (`src/modules/ats/ats.service.js`) calls this service via `PYTHON_SERVICE_URL` (default: `http://localhost:5001`).
