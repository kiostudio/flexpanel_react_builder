import Head from 'next/head'
import styles from '../styles/Home.module.css'

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { ... } } // See the "paths" section below
//     ],
//     fallback: true or false // See the "fallback" section below
//   };
// }

export async function getStaticProps({ params }) {
  console.log('API Params',process.env.GRAPHQL_ENDPOINT);
  return { props : { panelID : process.env.PANEL_ID , versionID : process.env.VERSION_ID , graphql : process.env.GRAPHQL_ENDPOINT } }
}

export default function Home({ panelID , versionID , graphql }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <h2>{panelID}-{versionID}</h2>
        <p>{graphql}</p>

      </main>
    </div>
  )
}
