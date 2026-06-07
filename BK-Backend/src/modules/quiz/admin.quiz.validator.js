export const validateCreateQuiz = (req, res, next) => {
  const { title, description, marks, category, subcategory, status } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (!description?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Description is required",
    });
  }

  if (marks === undefined || marks === null || Number(marks) < 0) {
    return res.status(400).json({
      success: false,
      message: "Valid marks is required",
    });
  }

  if (!category?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }

  if (!subcategory?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Subcategory is required",
    });
  }

  const allowed = ["draft", "published", "archived"];
  if (status && !allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  next();
};

export const validateUpdateQuiz = (req, res, next) => {
  const { marks, status } = req.body;

  if (marks !== undefined && Number(marks) < 0) {
    return res.status(400).json({
      success: false,
      message: "Marks cannot be negative",
    });
  }

  const allowed = ["draft", "published", "archived"];
  if (status && !allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  next();
};