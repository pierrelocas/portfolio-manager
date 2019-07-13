const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async email =>
          (await User.where({ email }).countDocuments()) === 0,
        message: ({ value }) => `Email ${value} has already been taken.` // TODO: Security
      }
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)


// Delete Portfolios and user
userSchema.statics.deleteUser = async function(_id) {
  const result = Portfolio.deletePortfolios(_id)
  return result
}

const User = mongoose.model('User', userSchema)

module.exports = User
