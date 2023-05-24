import "../styles/globals.css";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
      </SessionProvider>
  );
}

export default MyApp;
