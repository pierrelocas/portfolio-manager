const Joi = require('joi')

const CreatePortfolio = Joi.object().keys({
  //user_id: will come from the context loggedIn user
  name: Joi.string()
    .min(2)
    .max(254)
    .required()
    .label('Portfolio name'),
  exchange: Joi.string()
    .required()
    .label('Exchange'),
  currency: Joi.string()
    .required()
    .label('Currency'),
})

const GenericPortfolio = Joi.object().keys({
  //user_id: will come from the context loggedIn user
  name: Joi.string()
    .min(2)
    .max(254)
    .label('Portfolio name'),
  exchange: Joi.string().label('Exchange'),
  currency: Joi.string().label('Currency'),
})

module.exports = { CreatePortfolio, GenericPortfolio }
