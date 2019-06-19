const mongoose = require('mongoose')
const { Schema } = mongoose

const portfolioSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: async function(name) {
          return (
            (await Portfolio.where({
              name,
              user_id: this.user_id
            }).countDocuments()) === 0
          )
        },
        message: ({ value }) => `Portfolio <${value}> already exists.`
      }
    },
    exchange: {
      type: String,
      require: true
    },
    currency: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

portfolioSchema.statics.deletePortfolio = async function(_id) {
  const { deletedCount: portofolioDeleted } = await this.deleteOne({ _id })
  if (portofolioDeleted) {
    const { deletedCount: transactionDeleted } = await Transaction.deleteMany({
      portfolio_id: _id
    })
    console.log(
      `Portfolio(s) deleted : ${portofolioDeleted}. \n Transaction(s) deleted : ${transactionDeleted}.`
    )
    return true
  }
  return false
}

portfolioSchema.statics.deletePortfolios = async function(user_id) {
  const portfolios = await this.find({ user_id }, '_id')
  console.log(portfolios)
  for (p of portfolios) {
    console.log(p._id)
    const transacs = await Transaction.find({ portfolio_id: p.id })
    console.log(transacs)
  }
  return true
}

// portfolioSchema.statics.deletePortfolio = function(_id) {
//   this.deleteOne({ _id }, (err, result) => {
//     console.log(err, result)
//   })
//   // console.log('removing : ', _id, result)
//   return true
// }

// portfolioSchema.pre('remove', async function(next) {
//   console.log('removing pre hook')
//   console.log(Transaction)
//   await Transaction.deleteMany({ portfolio_id: this._id }).exec()
//   next()
// })

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
console.log(Portfolio.modelName)

module.exports = Portfolio
