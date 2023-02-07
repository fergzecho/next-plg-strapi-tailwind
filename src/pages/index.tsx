import Head from 'next/head'
import { useSession ,signOut, signIn } from 'next-auth/react'

export default function Home() {

  const { data: session, status } = useSession()


  return (
    <>
      <Head>
        <title>Fernando Besa Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">

          { session && <pre>{JSON.stringify(session, null, 2)}</pre> }

          { session && <button type="button" onClick={() => {signOut()}}>Signout</button> }

          { !session && <button type="button" onClick={() => {signIn()}}>Signin</button> }
      </main>
    </>
  )
}
