import RootLayout from '../app/layout'
import React from 'react'


const App = ({ Component, pageProps }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}

export default App
