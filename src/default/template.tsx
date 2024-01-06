import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef } from "react";

interface metaPage {
  title?: string;
  image?: string;
  description?: string;
  url?: string;
}

export default function Template({ children }: { children: React.ReactNode }) {
  const meta: metaPage = {
    title: "",
    image: "",
    description: "",
    url: "",
  };

  return (
    <>
      <Head>
        <meta httpEquiv="cache-control" content="public" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="audience" content="all" />
        <link rel="shortcut icon" href="/assets/snakeagain.png"></link>

        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />

        <title>SnakeAgain</title>

        <meta name="title" content="SnakeAgain" />
        <meta name="description" content="SnakeAgain" />

        <meta property="og:image" content="/assets/snakeagain-print.png" />

        <meta
          property="og:image:secure_url"
          content="/assets/snakeagain-print.png"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />

        <meta property="og:locale" content="pt_BR" />

        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="MobileOptimized" content="320" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      {children}
    </>
  );
}
