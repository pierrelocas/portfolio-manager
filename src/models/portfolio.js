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
  },
  exchange: {
    type: String,
    require: true
  },
  currency: {
    type: String,
    require: true
  }
}, {
  timestamps : true
})

module.exports = mongoose.model('Portfolio', portfolioSchema)

// module.exports =  Portfolio