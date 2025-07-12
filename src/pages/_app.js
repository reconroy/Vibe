import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Load Material Symbols */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Mukta:wght@200;300;400;500;600;700;800&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />

      </Head>
      <Component {...pageProps} />
    </>
  );
}
