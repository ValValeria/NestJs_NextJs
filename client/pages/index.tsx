import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
