import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AudioProvider } from '../contexts/AudioContext';
import MusicPlayer from '../components/MusicPlayer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <AudioProvider>
        <Component {...pageProps} />
        <MusicPlayer />
      </AudioProvider>
    </>
  );
}

export default MyApp;