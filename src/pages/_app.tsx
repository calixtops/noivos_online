import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AudioProvider } from '../contexts/AudioContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Open+Sans&display=swap" rel="stylesheet" />
      </Head>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </>
  );
}

export default MyApp;