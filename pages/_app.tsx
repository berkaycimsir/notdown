import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../utils/mui/theme';
import createEmotionCache from '../utils/mui/createEmotionCache';
import '../styles/globals.css';
import AppLayout from '../layouts/AppLayout';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';
import { ModalContextProvider } from '../contexts/modal';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <ModalContextProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ModalContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
