import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from 'components/layout'
import theme from 'theme'

function MyApp({ Component, pageProps, router }: AppProps) {
  const routerBanner = {
    title: pageProps.title,
    date: pageProps.date
  }
  return (
    <ChakraProvider theme={theme}>
      <Layout routerBanner={routerBanner}>
         <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
