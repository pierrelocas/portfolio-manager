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
    unique: true
  },
  password: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userShema)