import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    questionBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionBank',
      required: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      default: undefined, // important for NAT
      validate: {
        validator: function (arr) {
          if (this.questionType === 'NAT') {
            return !arr || arr.length === 0
          }
          return Array.isArray(arr) && arr.filter(Boolean).length >= 2
        },
        message: 'MCQ/MSQ must have at least 2 options, NAT should not have options',
      },
    },

    correctOptions: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          if (!Array.isArray(arr)) return false

          if (this.questionType === 'MCQ') {
            return arr.length === 1
          }

          if (this.questionType === 'MSQ') {
            return arr.length >= 2
          }

          if (this.questionType === 'NAT') {
            return arr.length === 1 && arr[0]?.trim()
          }

          return false
        },
        message: 'Invalid correctOptions based on question type',
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

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Optional strict check (only for NAT)
questionSchema.pre('validate', function () {
  if (this.questionType === 'NAT') {
    if (this.options && this.options.length > 0) {
      throw new Error('NAT should not have options')
    }
  }
})

questionSchema.index({ questionBankId: 1, createdAt: -1 })

const Question = mongoose.model('Question', questionSchema)

export default Question