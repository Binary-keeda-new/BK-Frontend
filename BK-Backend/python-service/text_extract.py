from flask import Flask, request, jsonify
import fitz  # PyMuPDF
import io
import re

app = Flask(__name__)

def extract_text_from_pdf_file(file):
    # Reset file pointer (important for Flask uploads)
    try:
        file.seek(0)
    except Exception:
        pass

    text = ""
    with fitz.open(stream=file.read(), filetype="pdf") as pdf:
        for page in pdf:
            # Safer, cleaner text extraction (non-AI)
            page_text = page.get_text("text", flags=fitz.TEXTFLAGS_TEXT)
            text += page_text + "\n"

    
    # Non-destructive normalization (does NOT change logic)
    
    # Normalize excessive newlines
    text = re.sub(r'\n{2,}', '\n', text)
    # Normalize excessive spaces/tabs
    text = re.sub(r'[ \t]+', ' ', text)
    # Normalize bullet characters for downstream parsing
    text = text.replace("•", "- ")

    return text.strip()

# @app.route("/extract_pdf_text", methods=["POST"])
def extract_pdf_text(file):
    try:
        text = extract_text_from_pdf_file(file)
        return {"text": text}
    except Exception as e:
        return {"error": str(e)}, 500

# if __name__ == "__main__":
#     app.run(debug=True)
