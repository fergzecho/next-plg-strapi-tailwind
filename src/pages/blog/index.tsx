import React, { useState, useRef, Ref, MutableRefObject } from 'react'
import { useQuery } from '@apollo/client'
import Blog from '../../../components/Blog'
import { FILTERED_POSTS } from 'data/Posts'


export default function BlogPosts() {


  const [search,setSearch] = useState(null);

  const searchInput = useRef<HTMLInputElement | null>(null);

  const { loading, error, data } = useQuery(FILTERED_POSTS, {variables: { limit: 12, search: search }});
  

  if (loading) return 'Loading ...';
  if(error) return `Error! ${error.message}`;

  const { posts } = data


  return (
  <section className="bg-dark dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
        </div> 
        <div className="grid gap-8 lg:grid-cols-2">

            <div>
                <input type="text" ref={searchInput} onChange={(e) => {
                    e.preventDefault();

                    setSearch(searchInput.current?.value)
                }}/>
            </div>

            <pre>{ JSON.stringify(posts, null, 2)}</pre>
                  
        </div>  
    </div>
  </section>
  )
}
