import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpotifyPlaylistWrapper from '../components/SpotifyPlaylistWrapper';

const PlaylistPage = () => {
  return (
    <>
      <Head>
        <title>Playlist Colaborativa - Geórgia & Pedro</title>
        <meta name="description" content="Contribua com músicas para nossa playlist de casamento no Spotify!" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-green-50 via-olive-50 to-green-50">
        <SpotifyPlaylistWrapper />
      </main>

      <Footer />
    </>
  );
};

export default PlaylistPage; 