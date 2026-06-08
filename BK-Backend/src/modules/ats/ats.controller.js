import * as atsService from './ats.service.js';


export async function standardAnalysis(req, res) {
  try {
    const { file } = req;
    const { jobDescription } = req.body;

    const resumeText = await atsService.extractResumeText(
      file.buffer,
      file.mimetype,
      file.originalname
    );

    if (!resumeText || !resumeText.trim()) {
      return res.status(422).json({
        success: false,
        error: 'Could not extract any text from the uploaded resume. Please try a different file.',
      });
    }

    const result = await atsService.runStandardATS(resumeText, jobDescription);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[ATS Standard] Error:', error.message);

    if (error.message.includes('extraction')) {
      return res.status(422).json({
        success: false,
        error: 'Failed to extract text from resume. Ensure the file is not corrupted.',
      });
    }

    return res.status(500).json({
      success: false,
      error: error.response?.data?.error || error.message || 'ATS analysis failed. Please try again.',
    });
  }
}


export async function aiAnalysis(req, res) {
  try {
    const { file } = req;
    const { jobDescription } = req.body;

    const resumeText = await atsService.extractResumeText(
      file.buffer,
      file.mimetype,
      file.originalname
    );

    if (!resumeText || !resumeText.trim()) {
      return res.status(422).json({
        success: false,
        error: 'Could not extract any text from the uploaded resume. Please try a different file.',
      });
    }

    const result = await atsService.runAIATS(resumeText, jobDescription);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[ATS AI] Error:', error.message);

    if (
      error.message.includes('Gemini') ||
      error.message.includes('model') ||
      error.message.includes('JSON')
    ) {
      return res.status(502).json({
        success: false,
        error: 'AI analysis engine is temporarily unavailable. Please try again later.',
      });
    }

    if (error.message.includes('extraction')) {
      return res.status(422).json({
        success: false,
        error: 'Failed to extract text from resume. Ensure the file is not corrupted.',
      });
    }

    return res.status(500).json({
      success: false,
      error: error.response?.data?.error || error.message || 'AI ATS analysis failed. Please try again.',
    });
  }
}
