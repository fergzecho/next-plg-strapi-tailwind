import React, { Attributes } from 'react'
import Image from 'next/image'
import { client } from '../../../constants/Apollo'
import { GET_ALL_POSTS, GET_SINGLE_POST } from 'data/Posts'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import AuthorBox from 'components/AuthorBox'
import { PostsAttributesT} from 'types/Posts'
import { GetStaticPaths } from 'next'


interface Context {
    params: {
        slug: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    // get all the available posts
    const { data } = await client.query({
        query: GET_ALL_POSTS
    })

      
    // create a collection of objects that has slugs as params init.
    const paths = await data.posts.data.map(({attributes}:PostsAttributesT) => {
        return { params: { slug: attributes.Slug } }
    })

    return {
        paths,
        fallback: false
    }
}



export async function getStaticProps (context:Context)  {

    try {
        const postSlug = context.params.slug


        const { data } = await client.query({
            query: GET_SINGLE_POST,
            variables: { slug: postSlug }
        })

        return {
            props: { data }
        }

    } catch (err:any) {
        return console.log("error", err.message)
    }
    
    
}

export default function Blog({data}:any) {

  const postData = data.posts.data[0]

  const {Title,Content,Authors,FeaturedImage} = postData.attributes

  const imageUrl = FeaturedImage.data.attributes.url


  return (
    <>
        <main>
            <div>
                <h1>{ Title }</h1>
                <Image src={imageUrl} alt="Featured Image" height="100" width="100"></Image>
                <ReactMarkdown>{Content}</ReactMarkdown>
                <AuthorBox props={Authors} />
            </div>
        </main>
    </>
    
  )
}
