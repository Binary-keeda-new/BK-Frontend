import mongoose from 'mongoose'
import Question from './question.model.js'
import QuestionBank from '../questionBank/questionBank.model.js'

export const getQuestionsByQuestionBankId = async (questionBankId) => {
  return await Question.find({
    questionBankId,
    isDeleted: false,
  }).sort({ createdAt: -1 })
}

export const createQuestionsForQuestionBank = async (
  questionBankId,
  questions,
  createdBy = null
) => {
  const questionBank = await QuestionBank.findOne({
    _id: questionBankId,
    isDeleted: false,
  })

  if (!questionBank) {
    throw new Error('Question bank not found')
  }

  const payload = questions.map((q) => ({
    questionBankId,
    question: q.question,
    options: q.options,
    correctOptions: q.correctOptions,
    positiveMarks: q.positiveMarks ?? 4,
    negativeMarks: q.negativeMarks ?? 1,
    questionType: q.questionType ?? 'single',
    imageUrl: q.imageUrl ?? null,
    createdBy,
  }))

  return await Question.insertMany(payload)
}

export const updateQuestionInQuestionBank = async (
  questionBankId,
  questionId,
  payload
) => {
  return await Question.findOneAndUpdate(
    {
      _id: questionId,
      questionBankId,
      isDeleted: false,
    },
    payload,
    {
      returnDocument: "after" ,
      runValidators: true,
    }
  )
}

export const deleteQuestionFromQuestionBank = async (
  questionBankId,
  questionId
) => {
  return await Question.findOneAndUpdate(
    {
      _id: questionId,
      questionBankId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      returnDocument: "after" ,
    }
  )
}