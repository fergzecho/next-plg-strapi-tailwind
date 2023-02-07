// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import { GET_ALL_POSTS_API } from './../../../data/Posts'
import { client } from 'constants/Apollo'

type Data = {
    name: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < Data >) {
      
    if(req.method === 'POST') {

      res.status(200).json({
        name: 'Method is not supported. Please change to GET'}
      )

    }

    if(req.method === 'GET') {

      const { data } = await client.query({
          query: GET_ALL_POSTS_API
      })

      res.status(200).json(data)

    }

    
}
