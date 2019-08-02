import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Account from './Account'
import Layout from './Layout'

/**
 * TODO: setContext isSignedIn
 * watch Harry with useReducer
 *
 * Things to check
 * - is there a token
 * - is the token valid
 * - is the email confirmed
 * - is signed in
 * - is there a request for email confirmation
 * - is there a request for reset password
 */

// TODO : Create isSignedIn query
// - get the errors in context
const AUTHENTICATION = gql`
  {
    isSignedIn
    isConfirmed
  }
`

export default function App(props) {
  const {
    loading,
    data: { isSignedIn, isConfirmed },
    refetch
  } = useQuery(AUTHENTICATION, {
    fetchPolicy: 'network-only'
  })

  if (loading) return <div>Loading...</div>
  return isSignedIn && isConfirmed ? (
    <Layout authenticate={refetch} />
  ) : (
    <Account
      authenticate={refetch}
      isSignedIn={isSignedIn}
      isConfirmed={isConfirmed}
    />
  )
}
