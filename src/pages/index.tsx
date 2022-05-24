import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { HOST, USER_ID, USER_PASSWORD, DASHBOARD_LIST } from "./metadata";

const Home: NextPage = () => {
    const prefix = '/userdefine/dashboard?layout=iframe&key=';
    const url = `${HOST}/login/sso?id=${USER_ID}&password=${USER_PASSWORD}&redirect=${encodeURIComponent(prefix + DASHBOARD_LIST[0])}`;

    return (
        <div className={styles.container}>
            <Head>
                <title>JENNIFER5 Dashboard - Iframe Mode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <iframe className={styles.iframe} src={url}></iframe>
            </main>
        </div>
    )
}

export default Home
