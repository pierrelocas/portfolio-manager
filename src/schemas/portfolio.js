const Joi = require('joi')

const AddPortfolio = Joi.object().keys({
  //user_id: will come from the context loggedIn user 
  name: Joi.string().min(2).max(5).required().label('Portfolio name')
})

module.exports = { AddPortfolio }