import Head from 'next/head'
import { wrapper } from 'redux/store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css'
import NextProgress from 'shared/lib/next-progress'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <NextProgress />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#2D3D63',
              color: '#fff'
            }
          }}
        />
        <Component {...props.pageProps} />
      </Provider>
    </>
  )
}
