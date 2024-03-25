import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import "../styles/global.scss";
import "../styles/tailwind.css";
import "../styles/components.scss";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// const trackingId = process.env.GA_TRACKING_ID;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const LayoutDefault = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => LayoutDefault(page));

  return (
    <>
      <Head>
        <title>TEST</title>
        <meta name={'Name'} content={'content'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {getLayout(
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        )}
    </>
  );
}

export default MyApp
