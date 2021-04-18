import type { AppProps } from 'next/app';

const IDev = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default IDev;
