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
  let tabList = uiTemplate.tabs.map((tab)=>{ return { id : tab.id , route : tab.route } });
  if(uiTemplate.tabs){
    homePage = uiTemplate.tabs.filter((tab)=>tab.route === "");
    if(homePage.length > 0) homePage = homePage[0];
    if(homePage.length === 0) homePage = uiTemplate.tabs[0];
    if(homePage['backgroundColor'] !== null) homePage['backgroundColor'] = JSON.parse(homePage['backgroundColor'])
  }

  return { props : { page : homePage , title : uiTemplate.name , favicon : uiTemplate.favicon , tabList : tabList } }
}

export default function Home({ page , title , favicon , tabList }) {
  // console.log(page);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{`${page.name} | ${title}`}</title>
        <meta name="description" content={`${(page && page.description) ? page.description : `${title} is an application build with Flexpanel, which is a tool to build software without coding.`}`}/>
        <link rel="icon" href={(favicon !== null) ? `data:image/png;base64,${favicon}` :"/favicon.ico"}/>
      </Head>
      <main style={{
        ...styles.mainContainer,
        backgroundColor : (page && page['backgroundColor']) ? `rgba(${page['backgroundColor'].r},${page['backgroundColor'].g},${page['backgroundColor'].b},${page['backgroundColor'].a})`  : '#E4E4E4',
      }}>
          <div onClick={()=>{}} style={{ position : 'absolute' , zIndex : 10 , bottom : 20 , right : 20 , fontWeight : 'bold' , borderRadius : 20 }}>
            <a href='/' style={styles.logoContainer}>
                <img alt={'logo'} style={{ 
                    ...styles.logo,
                    width : 20,
                    height : 20,
                    marginRight : 5
                }} src={'/logo.png'}/>
                {"Made in Flexpanel"}
            </a>
          </div>
          <Grid 
              page={page}
              title={title}
              router={router}
              tabList={tabList}
              // setTabId={setTabId}
              // deviceAgent={deviceAgent} 
              // panelId={panelId}
              pageId={page.id} 
              // setError={setError}
          />
      </main>
    </div>
  )
}

const styles = {
  mainContainer : {
    backgroundColor : '#FFFFFF' , 
    height : '100vh' , 
    width : '100%',
    overflowY : 'scroll',
    overflowX : 'hidden',
    // display : 'flex',
    // flexDirection : 'column',
    // justifyContent : 'center',
    // alignItems : 'center'
  },
  gridPortView : {
    height : '100%' , 
    // overflow : 'hidden'
  },
  logoContainer : {
    display : 'flex',
    alignSelf : 'stretch',
    alignItems : 'center',
    justifyContent : 'center',
    marginLeft : 5,
    backgroundColor : '#f5f8fa',
    padding : '10px 20px',
    borderRadius : 50,
    boxShadow : 'inset 0 0 0 1px rgb(16 22 26 / 20%), inset 0 -1px 0 rgb(16 22 26 / 10%)'
  },
  container : {
    overflow: 'hidden'
  }
}
