// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon PNG simples */}
        <link rel="icon" href="/images/auxiliares/favicon.png" type="image/png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags para PWA */}
        <meta name="theme-color" content="#8FBC8F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="G&P Casamento" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600&family=Dancing+Script:wght@400;500&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&family=Libre+Baskerville:wght@400;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Meta tags para performance */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body className="bg-olive-50 text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
