import {
  createQuestionBank as createQuestionBankService,
  getAllQuestionBanks as getAllQuestionBanksService,
  getQuestionBankById as getQuestionBankByIdService,
  updateQuestionBank as updateQuestionBankService,
  deleteQuestionBank as deleteQuestionBankService,
} from './questionBank.service.js'

export const createQuestionBank = async (req, res, next) => {
  try {
    const { title, description } = req.body

    const questionBank = await createQuestionBankService({
      title,
      description,
      createdBy: req.user?._id,
    })

    return res.status(201).json({
      success: true,
      message: 'Question bank created successfully',
      data: questionBank,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllQuestionBanks = async (req, res, next) => {
  try {
    const questionBanks = await getAllQuestionBanksService()

    return res.status(200).json({
      success: true,
      message: 'Question banks fetched successfully',
      data: questionBanks,
    })
  } catch (error) {
    next(error)
  }
}

export const getQuestionBankById = async (req, res, next) => {
  try {
    const { id } = req.params

    const questionBank = await getQuestionBankByIdService(id)

    if (!questionBank) {
      return res.status(404).json({
        success: false,
        message: 'Question bank not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Question bank fetched successfully',
      data: questionBank,
    })
  } catch (error) {
    next(error)
  }
}

export const updateQuestionBank = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const updatedQuestionBank = await updateQuestionBankService(id, {
      title,
      description,
    })

    if (!updatedQuestionBank) {
      return res.status(404).json({
        success: false,
        message: 'Question bank not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Question bank updated successfully',
      data: updatedQuestionBank,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteQuestionBank = async (req, res, next) => {
  try {
    const { id } = req.params

    const deletedQuestionBank = await deleteQuestionBankService(id)

    if (!deletedQuestionBank) {
      return res.status(404).json({
        success: false,
        message: 'Question bank not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Question bank deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}