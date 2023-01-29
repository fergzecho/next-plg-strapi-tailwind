import { useState } from 'react'
import { client } from 'constants/Apollo'
import { gql } from '@apollo/client'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  const login = async (email:string, password:string) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation ($email: String!, $password: String!) {
            login(input: {email: $email, password: $password}) {
              jwt
              user {
                id
                username
                email
              }
            }
          }
        `,
        variables: { email, password }
      })
      const { jwt, user } = response.data.login
      localStorage.setItem('token', jwt)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, login, logout }
}