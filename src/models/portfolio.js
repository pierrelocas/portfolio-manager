const mongoose = require('mongoose')
const { Schema } = mongoose

const portfolioSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps : true
})

module.exports = mongoose.model('Portfolio', portfolioSchema)