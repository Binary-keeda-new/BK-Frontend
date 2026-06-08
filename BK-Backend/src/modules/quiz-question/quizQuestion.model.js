import mongoose from 'mongoose'

const quizQuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
      index: true,
    },

    sourceType: {
      type: String,
      enum: ['manual', 'bank'],
      default: 'manual',
    },

    sourceQuestionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      default: null,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          if (this.questionType === 'NAT') return true
          return Array.isArray(arr) && arr.filter(Boolean).length >= 2
        },
        message: 'At least 2 options are required for MCQ/MSQ questions',
      },
    },

    correctOptions: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.filter(Boolean).length >= 1
        },
        message: 'At least 1 correct option is required',
      },
    },

    positiveMarks: {
      type: Number,
      default: 4,
      min: 0,
    },

    negativeMarks: {
      type: Number,
      default: 1,
      min: 0,
    },

    questionType: {
      type: String,
      enum: ['MCQ', 'MSQ', 'NAT'],
      required: true,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

quizQuestionSchema.pre('validate', function () {
  if (this.questionType === 'MCQ' && this.correctOptions.length !== 1) {
    throw new Error('MCQ must have exactly 1 correct option')
  }

  if (this.questionType === 'MSQ' && this.correctOptions.length < 2) {
    throw new Error('MSQ must have at least 2 correct options')
  }

  if (this.questionType === 'NAT') {
    if (this.options.length > 0) {
      throw new Error('NAT questions should not have options')
    }

    if (this.correctOptions.length !== 1) {
      throw new Error('NAT must have exactly 1 answer')
    }

    if (!this.correctOptions[0] || !this.correctOptions[0].trim()) {
      throw new Error('NAT answer cannot be empty')
    }
  }
})

quizQuestionSchema.index({ quizId: 1, createdAt: -1 })

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema)

export default QuizQuestion