import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
