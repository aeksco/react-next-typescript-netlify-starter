import React from "react";
import "../styles/app.css";
import Amplify from "aws-amplify";
import Link from "next/link";
import config from "../aws-exports";

Amplify.configure({
    ...config,
    ssr: true,
});

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <nav style={{ display: "flex" }}>
                <Link href="/">Home</Link>
                <Link href="/profile">Profile</Link>
            </nav>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
