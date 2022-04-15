import Router from "next/router";
import Head from "next/head";
import nprogress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  nprogress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    nprogress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    nprogress.done();
  });

  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
