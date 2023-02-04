import { useSession, signIn, signOut } from "next-auth/react"
import { FormEventHandler, HTMLInputTypeAttribute, useRef } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  
  const email = useRef<HTMLInputElement | undefined>()
  const password = useRef<HTMLInputElement | undefined>()

  const handleSubmit:FormEventHandler = (e) => {
    e.preventDefault();

    signIn('Credentials', {redirect: false, email: email?.current?.value, password: password?.current?.value})
  }

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <form onSubmit={handleSubmit}>
          <input type="email" name="email" id="email" ref={email}/>
          <input type="password" name="password" id="password" ref={password} />
          <input type="submit" value="Login" />
      </form>
    </>
  )
}