import React, { useContext} from 'react'

import { gql } from '@apollo/client'
import client from '../constants/Apollo'

export const getStaticProps = async () => {

  const response = await client.query({
    query: gql`
      query getAllPost {
        posts(first: 12, where: {status: PUBLISH}) {
          edges {
            node {
              title
              categories {
                nodes {
                  name
                }
              }
              databaseId
              slug
            }
          }
        }
      }
    `
  })

  return {
    props: { blogs: response},
    blocking: false
  }

}


export default function BlogPosts({ blogs }: any) {

  console.log(blogs)

  return (
      <>

      </>
  )
}
