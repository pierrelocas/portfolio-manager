import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Account from './Account'
import Dashboard from './Dashboard'

// TODO : Create isSignedIn query
// - get the errors in context
const GET_USER = gql`
  {
    me {
      _id
      firstname
      lastname
      email
      confirmed
    }
  }
`

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

export default function App(props) {
  const [signedIn, setSignedIn] = useState(false)
  const [request, setRequest] = useState(null)
  const { loading, data } = useQuery(GET_USER)

  /**
   * The goal here is to check if if user is signed in
   * and email is confirmed. If so, just go to the dashboard,
   * else go to account. Handle email confirmation and password
   * reset in account component
   */
  useEffect(() => {
    if (data.me) setSignedIn(true)
  }, [data])

  // function handleSignIn()

  /* this goes in account */
  useEffect(() => {
    const urlString = window.location.href
    const url = new URL(urlString)
    if (url.search) {
      const type = url.searchParams.get('type')
      const token = url.searchParams.get('token')
      setRequest({ type, token })
      // console.log(url)
      // console.log(type, token)
      // console.log(request)
    }
  }, [])

  if (loading) return <div>Loading...</div>
  console.log(request)
  return signedIn && !request ? (
    <Dashboard setSignedIn={setSignedIn} />
  ) : (
    <Account setSignedIn={setSignedIn} request={request} />
  )
}
