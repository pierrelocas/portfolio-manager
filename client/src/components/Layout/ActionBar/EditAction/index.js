import React from 'react'

import EditPortfolioAction from './EditPortfolioAction'
import EditTransactionAction from './EditTransactionAction'

const EditAction = props => {
  const { page, QUERY, activePortfolio, portfolios } = props
  console.log(page)

  let content
  switch (page) {
    case 'Portfolios':
      content = (
        <EditPortfolioAction
          page={page}
          QUERY={QUERY}
          activePortfolio={activePortfolio}
          portfolios={portfolios}
        />
      )
      break
    case 'Transactions':
      content = <EditTransactionAction page={page} QUERY={QUERY} />
      break
    default:
      content = <h3>No edit available for current context</h3>
      break
  }
  return <>{content}</>
}

export default EditAction
