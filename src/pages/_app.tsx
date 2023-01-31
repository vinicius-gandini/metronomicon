import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { BpmProvider } from '../contexts/BpmContext';

import theme from '../themes';
import '../themes/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BpmProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </BpmProvider>
  )
}

export default MyApp
