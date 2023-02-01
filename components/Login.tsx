import React, { FormEventHandler, useRef, useContext } from 'react'
import { AuthContext } from 'context/AuthContext';



export default function Login() {

  const { login } = useContext(AuthContext)

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null)

  const handleSubmit:FormEventHandler = (e) => {
    e.preventDefault();
    
    login (username?.current?.value,password?.current?.value)


 
  }

  return (
    <>
    <form className="flex flex-row gap-2 mt-8" onSubmit={handleSubmit}>
        <input type="text" defaultValue="fernando@productled.com" ref={username} />
        <input type="password" defaultValue="!@#Yagami1231" ref={password} />
        <button>Login</button>
    </form> 
            
    </>
    
  )
}
