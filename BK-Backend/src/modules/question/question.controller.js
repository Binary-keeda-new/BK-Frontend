import {
  getQuestionsByQuestionBankId,
  createQuestionsForQuestionBank,
  updateQuestionInQuestionBank,
  deleteQuestionFromQuestionBank,
} from './question.service.js'

export const getQuestionBankQuestions = async (req, res, next) => {
  try {
    const { id } = req.params

    const questions = await getQuestionsByQuestionBankId(id)

    return res.status(200).json({
      success: true,
      message: 'Questions fetched successfully',
      data: questions,
    })
  } catch (error) {
    next(error)
  }
}

export const createQuestionBankQuestions = async (req, res, next) => {
  try {
    const { id } = req.params
    const { questions } = req.body

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required',
      })
    }

    const createdQuestions = await createQuestionsForQuestionBank(
      id,
      questions,
      req.user?._id || null
    )

    return res.status(201).json({
      success: true,
      message: 'Questions created successfully',
      data: createdQuestions,
    })
  } catch (error) {
    next(error)
  }
}

export const updateQuestionBankQuestion = async (req, res, next) => {
  try {
    const { id, questionId } = req.params
    const {
      question,
      options,
      correctOptions,
      positiveMarks,
      negativeMarks,
      questionType,
      imageUrl,
    } = req.body

    const updatedQuestion = await updateQuestionInQuestionBank(id, questionId, {
      question,
      options,
      correctOptions,
      positiveMarks,
      negativeMarks,
      questionType,
      imageUrl,
    })

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: updatedQuestion,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteQuestionBankQuestion = async (req, res, next) => {
  try {
    const { id, questionId } = req.params

    const deletedQuestion = await deleteQuestionFromQuestionBank(id, questionId)

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}