import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import {client} from '../../constants/Apollo'
import { SessionProvider } from 'next-auth/react'


export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <ApolloProvider client={client} >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>

  )
}
