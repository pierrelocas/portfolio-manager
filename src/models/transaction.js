const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  portfolio_id:{
    type: Schema.Types.ObjectId,
    ref: 'Portfolio'
  },
  date:{
    type: Date,
    required: true
  },
  stock:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  commission:{
    type: Number,
    required: true
  }
}, {
  timestamps: true
})



module.exports = mongoose.model('Transaction', transactionSchema )