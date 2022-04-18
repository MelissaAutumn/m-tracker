import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ModPlayer from "../components/ModPlayer/ModPlayer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>m-tracker</title>
        <meta name="description" content="A mod tracker player"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <ModPlayer/>
      </main>
    </div>
  )
}

export default Home
