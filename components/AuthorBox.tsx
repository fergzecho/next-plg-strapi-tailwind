import React, { ReactNode } from 'react'


export default function AuthorBox({props}:any) {

  

  return (
    <div>

      { props.data.length > 1 ? "Hi" : "Hellow"}
      
    </div>
  )
}
