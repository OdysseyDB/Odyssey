import AuthModal from "../Components/AuthModal/AuthModal";
import "../styles/root/globals.scss";
import { AuthProvider, getUserFromSession } from "../context/authContext";
import App from "next/app";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

function MyApp({ Component, pageProps, user }) {
  return (
    <AuthProvider ssrUser={user}>
      <Head>
        <title>Odyssey</title>
        <meta name="description" content="Awesome website for Odyssey" />
        <link rel="icon" href="/ods_logo.png" />
      </Head>
      <AuthModal />
      <NextNProgress color="#ff4f46" height={5} />

      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (appContext.router.isSsr === undefined) {
    const appProps = await App.getInitialProps(appContext);
    const user = await getUserFromSession(appContext.ctx);
    return { ...appProps, user: user };
  } else {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }
};

export default MyApp;
