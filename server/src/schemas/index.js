// require('./user'),
module.exports = {
  ...require('./user'),
  ...require('./portfolio'),
  ...require('./transaction')
}