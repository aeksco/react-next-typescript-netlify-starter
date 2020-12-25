import React from "react";
import "../styles/app.css";
import Amplify from "aws-amplify";
import Link from "next/link";
import config from "../aws-exports";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

Amplify.configure({
    ...config,
    ssr: true,
});

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <nav style={{ display: "flex" }}>
                <Link href="/">Home</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/todos">Todos</Link>
            </nav>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <Component {...pageProps} />
            </ReactQueryCacheProvider>
        </div>
    );
}

export default MyApp;
