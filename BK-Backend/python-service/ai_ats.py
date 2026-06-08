import os
import google.generativeai as genai
import json
import re

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "models/gemini-2.5-flash"


SYSTEM_PROMPT_1 = """
You are a deterministic information extraction engine.

CRITICAL RULES:
- Output ONLY valid JSON.
- Do NOT include explanations, comments, markdown, or code fences.
- Do NOT include any text before or after the JSON.
- If unsure, return empty fields, not explanations.
- Extract facts only from the given text.
- Normalize synonyms (e.g., ReactJS → React).
"""


USER_PROMPT_1_TEMPLATE = """
Extract structured data from the resume and job description below.

Return JSON exactly in this schema:

{
  "resume": {
    "skills": [],
    "roles": [],
    "seniority": "",
    "domains": [],
    "education": [],
    "certifications": []
  },
  "job": {
    "required_skills": [],
    "preferred_skills": [],
    "experience_level": "",
    "role_focus": "",
    "mandatory_qualifications": []
  }
}

Resume:
{resume}

Job Description:
{job}
"""


SYSTEM_PROMPT_2 = """You are an ATS evaluation engine and career advisor.

CRITICAL RULES:
- Output ONLY valid JSON.
- Do NOT include explanations or text outside JSON.
- Scores must be between 0 and 1.
- Be conservative but fair.
- Do not assign a score of 0 if clear evidence exists.
- Provide detailed, actionable feedback.
- Be specific about skill gaps and missing keywords.
"""


USER_PROMPT_2_TEMPLATE = """
Evaluate the candidate against the job using the structured data below.

Return JSON exactly in this schema:

{
  "skill_alignment": {
    "semantic_score": 0.0,
    "matched": [],
    "missing_critical": []
  },
  "experience_relevance": {
    "relevance_score": 0.0,
    "gaps": []
  },
  "writing_quality": {
    "quality_score": 0.0,
    "issues": []
  },
  "overall_fit": {
    "fit_score": 0.0,
    "indicators": []
  },
  "detailed_feedback": {
    "skill_gap_analysis": {
      "critical_missing_skills": [],
      "recommended_skills_to_add": [],
      "skills_to_emphasize_more": []
    },
    "keyword_analysis": {
      "missing_important_keywords": [],
      "keywords_found": []
    },
    "feedback_paragraphs": {
      "strengths": "",
      "weaknesses": "",
      "overall_assessment": "",
      "improvement_suggestions": ""
    },
    "actionable_recommendations": {
      "immediate_changes": [],
      "content_improvements": [],
      "formatting_tips": []
    }
  }
}

Structured Data:
<<<STRUCTURED_JSON>>>
"""


def call_llm(system_prompt, user_prompt):
    combined_prompt = f"{system_prompt}\n\n{user_prompt}"

    model = genai.GenerativeModel(MODEL)

    response = model.generate_content(
        combined_prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.2,
        )
    )
    return response.text


def safe_json_parse(text):
    if not text or not text.strip():
        raise ValueError("Model returned empty response")

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{[\s\S]*\}", text)
        if match:
            return json.loads(match.group())
        else:
            raise ValueError("No valid JSON found in model output")


def run_ats(resume_text, job_text):

    user_prompt_1 = f"""
Extract structured data from the resume and job description below.

Return JSON exactly in this schema:

{{
  "resume": {{
    "skills": [],
    "roles": [],
    "seniority": "",
    "domains": [],
    "education": [],
    "certifications": []
  }},
  "job": {{
    "required_skills": [],
    "preferred_skills": [],
    "experience_level": "",
    "role_focus": "",
    "mandatory_qualifications": []
  }}
}}

Resume:
{resume_text}

Job Description:
{job_text}
"""

    extraction_raw = call_llm(SYSTEM_PROMPT_1, user_prompt_1)
    extraction = safe_json_parse(extraction_raw)

    user_prompt_2 = f"""
Evaluate the candidate against the job using the structured data below.

Return JSON exactly in this schema:

{{
  "skill_alignment": {{
    "semantic_score": 0.0,
    "matched": [],
    "missing_critical": []
  }},
  "experience_relevance": {{
    "relevance_score": 0.0,
    "gaps": []
  }},
  "writing_quality": {{
    "quality_score": 0.0,
    "issues": []
  }},
  "overall_fit": {{
    "fit_score": 0.0,
    "indicators": []
  }},
  "detailed_feedback": {{
    "skill_gap_analysis": {{
      "critical_missing_skills": [],
      "recommended_skills_to_add": [],
      "skills_to_emphasize_more": []
    }},
    "keyword_analysis": {{
      "missing_important_keywords": [],
      "keywords_found": []
    }},
    "feedback_paragraphs": {{
      "strengths": "",
      "weaknesses": "",
      "overall_assessment": "",
      "improvement_suggestions": ""
    }},
    "actionable_recommendations": {{
      "immediate_changes": [],
      "content_improvements": [],
      "formatting_tips": []
    }}
  }}
}}

Structured Data:
{json.dumps(extraction)}
"""

    evaluation_raw = call_llm(SYSTEM_PROMPT_2, user_prompt_2)
    evaluation = safe_json_parse(evaluation_raw)

    final_score = (
        evaluation["skill_alignment"]["semantic_score"] * 0.30 +
        evaluation["experience_relevance"]["relevance_score"] * 0.25 +
        evaluation["writing_quality"]["quality_score"] * 0.15 +
        evaluation["overall_fit"]["fit_score"] * 0.10
    )

    return {
        "extraction": extraction,
        "evaluation": evaluation,
        "final_score_percent": round(final_score * 100, 2)
    }