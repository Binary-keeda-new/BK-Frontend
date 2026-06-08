import axios from 'axios';
import FormData from 'form-data';
import mammoth from 'mammoth';

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';


export async function extractResumeText(fileBuffer, mimetype, originalname) {
  if (mimetype === 'application/pdf') {
    return extractPDFText(fileBuffer, originalname);
  }

  if (
    mimetype ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return extractDOCXText(fileBuffer);
  }

  if (mimetype === 'text/plain') {
    return fileBuffer.toString('utf-8').trim();
  }

  throw new Error(`Unsupported file type: ${mimetype}`);
}


async function extractPDFText(fileBuffer, originalname) {
  const formData = new FormData();
  formData.append('file', fileBuffer, {
    filename: originalname,
    contentType: 'application/pdf',
  });

  const response = await axios.post(
    `${PYTHON_SERVICE_URL}/pdf/extract`,
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 30000,
    }
  );

  if (!response.data || !response.data.text) {
    throw new Error('PDF extraction returned empty text');
  }

  return response.data.text;
}

// Extract text from a DOCX file using mammoth.
 
async function extractDOCXText(fileBuffer) {
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  const text = (result.value || '').trim();

  if (!text) {
    throw new Error('DOCX extraction returned empty text');
  }

  return text;
}



export async function runStandardATS(resumeText, jobDescription) {
  const response = await axios.post(
    `${PYTHON_SERVICE_URL}/ats/skill-match`,
    {
      resume_text: resumeText,
      job_description: jobDescription,
    },
    { timeout: 30000 }
  );

  if (!response.data || !response.data.result) {
    throw new Error('Standard ATS engine returned no result');
  }

  const result = response.data.result;

  return {
    score: result.overall_match_score,
    skill_match_score: result.skill_match_score,
    experience_match_score: result.experience_match_score,
    matched_skills: result.matched_skills || [],
    missing_skills: result.missing_skills || [],
    extra_skills: result.extra_skills || [],
    job_skills: result.job_skills || [],
    resume_skills: result.resume_skills || [],
  };
}



export async function runAIATS(resumeText, jobDescription) {
  const response = await axios.post(
    `${PYTHON_SERVICE_URL}/ats/ai-analysis`,
    {
      resume_text: resumeText,
      job_description: jobDescription,
    },
    { timeout: 60000 }
  );

  if (!response.data || !response.data.result) {
    throw new Error('AI ATS engine returned no result');
  }

  return response.data.result;
}
