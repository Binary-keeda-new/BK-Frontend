const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;


export function validateATSRequest(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No resume file uploaded. Please attach a PDF, DOCX, or TXT file.',
    });
  }

  const originalName = req.file.originalname || '';
  const ext = originalName.slice(originalName.lastIndexOf('.')).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return res.status(400).json({
      success: false,
      error: `Invalid file type "${ext}". Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`,
    });
  }

  if (!ALLOWED_MIMETYPES.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported MIME type "${req.file.mimetype}". Upload a PDF, DOCX, or TXT file.`,
    });
  }

  if (req.file.size > MAX_FILE_SIZE) {
    const sizeMB = (req.file.size / (1024 * 1024)).toFixed(2);
    return res.status(400).json({
      success: false,
      error: `File too large (${sizeMB} MB). Maximum allowed size is 5 MB.`,
    });
  }

  const jobDescription = req.body.jobDescription || '';
  if (!jobDescription.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Job description is required. Please paste the job requirements.',
    });
  }

  next();
}
