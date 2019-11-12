const mongoose = require('mongoose')
const { Schema } = mongoose

const Portfolio = require('./portfolio')
// NOTE: Transaction could not depend on portfolio if portfolio depends on Transaction.
// I think I need to do the validation outside of the schema in order to wait that both model are created
// Or do the validation in the resolver
// Maybe have them in the same files.
// Check what is really needed... cascade delete ?

const transactionSchema = new Schema(
  {
    portfolio_id: {
      type: Schema.Types.ObjectId,
      ref: 'Portfolio',
      validate: {
        validator: async _id =>
          (await Portfolio.where({ _id }).countDocuments()) !== 0,
        message: ({ value }) => `Portfolio <${value}> doesn't exists.`
      }
    },
    date: {
      type: Date,
      required: true
    },
    stock: {
      type: String,
      required: true,
      uppercase: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    commission: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true }
  }
)
// NOTE: this is an interesting method, except the fact it needs to be async, which cause it hard to handle
// transactionSchema.virtual('user_id').get(async function() {
//   const {
//     portfolio_id: { user_id }
//   } = await this.populate({
//     path: 'portfolio_id',
//     select: 'user_id'
//   }).execPopulate()
//   return await user_id
// })

// transactionSchema.pre('deleteTransaction', { document: true }, function() {
//   console.log(this.portfolio_id, 'Removing!')
// })

// transactionSchema.method('getOwnerId', async function() {
//   const { user_id } = await Portfolio.findById(
//     { _id: this.portfolio_id },
//     'user_id'
//   )
//   return user_id.toString()
// })

// transactionSchema.static('getOwnerId', async function(transacId) {
//   console.log(transacId)
//   const transac = await this.findById({ _id: transacId })
//   const {
//     portfolio_id: { user_id }
//   } = await transac
//     .populate({
//       path: 'portfolio_id'
//     })
//     .execPopulate()
//   console.log(user_id)
// })

// transactionSchema.methods.deleteTransaction = async function() {
//   const portfolio = await Portfolio.findById({ _id: this.portfolio_id })

//   console.log(portfolio)
// }

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
