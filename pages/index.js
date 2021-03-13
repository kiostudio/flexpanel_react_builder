import Head from 'next/head'
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic'
import Grid from '../src/component/panel/grid';
// import styles from '../styles/Home.module.css'

// export async function getStaticPaths() {
//   console.log('API Params',process.env.GRAPHQL_ENDPOINT);
//   const axios = require('axios');
//   const gql = require('graphql-tag');
//   const graphql = require('graphql');
//   const { print } = graphql;
//   let templatePath = [];

//   const uiGenerator = gql`
//     mutation UiGenerator($panelID: String, $versionID: String, $userID: String) {
//       uiGenerator(panelID: $panelID, versionID: $versionID, userID: $userID)
//     }
//   `;

//   const getMainDevVersionUI = await axios({
//     url: process.env.GRAPHQL_ENDPOINT,
//     method: 'post',
//     headers: {
//         'x-api-key': process.env.GRAPHQL_API_KEY
//     },
//     data: {
//         query: print(uiGenerator),
//         variables: {
//           panelID: process.env.PANEL_ID,
//           versionID: process.env.VERSION_ID
//         }
//     }
//   });
//   const uiTemplate = JSON.parse(getMainDevVersionUI.data.data.uiGenerator)['body'];
//   console.log('UI Template of this Flexpanel Project : ',uiTemplate);
//   // templatePath = uiTemplate.map((tab)=>{
//   //   return { params : { id : tab.route } }
//   // })
//   //   return {
//   //     paths: [
//   //       { params: { ... } } // See the "paths" section below
//   //     ],
//   //     fallback: true or false // See the "fallback" section below
//   //   };
//   // return { paths : templatePath , fallback : false }
// }

export async function getStaticProps({ params }) {
  // console.log('API Params',process.env.GRAPHQL_ENDPOINT);
  const axios = require('axios');
  const gql = require('graphql-tag');
  const graphql = require('graphql');
  const { print } = graphql;

  const uiGenerator = gql`
    mutation UiGenerator($panelID: String, $versionID: String, $userID: String) {
      uiGenerator(panelID: $panelID, versionID: $versionID, userID: $userID)
    }
  `;
  const getMainDevVersionUI = await axios({
    url: process.env.GRAPHQL_ENDPOINT,
    method: 'post',
    headers: {
        'x-api-key': process.env.GRAPHQL_API_KEY
    },
    data: {
        query: print(uiGenerator),
        variables: {
          panelID: process.env.PANEL_ID,
          versionID: process.env.VERSION_ID
        }
    }
  });
  const uiTemplate = JSON.parse(getMainDevVersionUI.data.data.uiGenerator)['body'];
  // console.log('UI Template of this Flexpanel Project : ',uiTemplate);
  let homePage = null;
  if(uiTemplate.tabs){
    homePage = uiTemplate.tabs.filter((tab)=>tab.route == "");
    if(homePage.length === 0) homePage = uiTemplate.tabs[0];
  }

  return { props : { page : homePage , title : uiTemplate.name , favicon : uiTemplate.favicon } }
}

const styles = {
  panelContainer : {
    backgroundColor : '#FFFFFF' , 
    height : '100%' , 
    width : '100%'
  },
  gridPortView : {
    height : '100%' , 
    overflow : 'hidden'
  }
}

export default function Home({ page , title , favicon }) {
  console.log(page);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>{`${page.name} | ${title}`}</title>
        <meta name="description" content={`${(page && page.description) ? page.description : `${title} is an application build with Flexpanel, which is a tool to build software without coding.`}`}/>
        <link rel="icon" href={(favicon !== null) ? `data:image/png;base64,${favicon}` :"/favicon.ico"}/>
      </Head>

      <main className={styles.panelContainer}>
        {/* <p>{JSON.stringify(page)}</p> */}
        <div
          style={{
              ...styles.gridPortView,
              width : '100%',
              backgroundColor : (page && page['backgroundColor']) ? `rgba(${page['backgroundColor'].r},${page['backgroundColor'].g},${page['backgroundColor'].b},${page['backgroundColor'].a})`  : '#E4E4E4',
              display : 'flex',
              justifyContent : 'center'
          }}
        >
          <Grid 
              page={page}
              title={title}
              router={router}
              // setTabId={setTabId}
              // deviceAgent={deviceAgent} 
              // panelId={panelId}
              pageId={page.id} 
              // setError={setError}
          /> 
        </div>
      </main>
    </div>
  )
}
