import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AudioProvider } from '../contexts/AudioContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CoupleProvider } from '../contexts/CoupleContext';
import OnboardingTips from '../components/OnboardingTips';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <CoupleProvider>
        <ThemeProvider>
          <AudioProvider>
            <Component {...pageProps} />
            <OnboardingTips />
          </AudioProvider>
        </ThemeProvider>
      </CoupleProvider>
    </>
  );
}

export default MyApp;