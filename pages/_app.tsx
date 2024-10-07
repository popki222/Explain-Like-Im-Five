import '../app/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <title>Explain Like I'm 5</title>
      <link rel="icon" href="/png/smiling-face.png" type="image/png" />
    </Head>
    <Component {...pageProps} />;
  </>
    
)
}