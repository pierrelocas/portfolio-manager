const mongoose = require('mongoose')
const { Schema } = mongoose

const userShema = new Schema({
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
      validator: async email => await User.where({ email }).countDocuments() === 0, 
      message: ({ value }) => `Email ${value} has already been taken.`  // TODO: Security
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
}, {
  timestamps: true
})

const User = mongoose.model('User', userShema)

module.exports = User