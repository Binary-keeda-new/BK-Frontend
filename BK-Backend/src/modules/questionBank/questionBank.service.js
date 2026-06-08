import QuestionBank from './questionBank.model.js'

export const createQuestionBank = async (payload) => {
  return await QuestionBank.create(payload)
}

export const getAllQuestionBanks = async () => {
  return await QuestionBank.find().sort({ createdAt: -1 })
}

export const getQuestionBankById = async (id) => {
  return await QuestionBank.findById(id)
}

export const updateQuestionBank = async (id, payload) => {
  return await QuestionBank.findByIdAndUpdate(id, payload, {
    returnDocument: "after" ,
    runValidators: true,
  })
}

export const deleteQuestionBank = async (id) => {
  return await QuestionBank.findByIdAndDelete(id)
}