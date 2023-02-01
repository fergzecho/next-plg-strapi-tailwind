import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import {client} from '../../constants/Apollo'
import { AuthProvider } from 'context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} >
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>

  )
}
