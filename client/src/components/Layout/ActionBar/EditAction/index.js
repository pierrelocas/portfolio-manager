import React from 'react'

import EditPortfolioAction from './EditPortfolioAction'
import EditTransactionAction from './EditTransactionAction'

const EditAction = props => {
  const {
    page,
    QUERY,
    portfolios,
    transactions,
    activePortfolio,
    handlePortfolioChange,
    selectedTransactionId
  } = props
  // console.log(page)

  let content
  switch (page) {
    case 'Portfolios':
      content = (
        <EditPortfolioAction
          page={page}
          QUERY={QUERY}
          activePortfolio={activePortfolio}
          handlePortfolioChange={handlePortfolioChange}
          portfolios={portfolios}
        />
      )
      break
    case 'Transactions':
      content = (
        <EditTransactionAction
          page={page}
          QUERY={QUERY}
          transactions={transactions}
          selectedTransactionId={selectedTransactionId}
        />
      )
      break
    default:
      content = <h3>No edit available for current context</h3>
      break
  }
  return <>{content}</>
}

export default EditAction
