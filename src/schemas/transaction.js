const Joi = require('joi')

// check the uppercase fonction, doesn't seem to do anything
// check if the use of isoDate() can be usefull
const AddTransaction = Joi.object().keys({
  portfolio_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'portfolio_id').required().label('Portfolio Id'),
  date: Joi.date().required().label('Date'),
  stock: Joi.string().uppercase().required().label('Stock'),
  quantity: Joi.number().required().label('Quantity'),
  price: Joi.number().required().label('Price'),
  commission: Joi.number().required().label('Price')
})

module.exports = { AddTransaction }