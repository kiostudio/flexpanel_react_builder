import Head from 'next/head'
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic'
import Grid from '../src/component/panel/grid';
// import styles from '../styles/Home.module.css'
import Amplify, { Storage } from 'aws-amplify';
Amplify.configure({ 
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:c3faeb6c-0d99-4354-a48f-254d5d245d07",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_DVqghGqEM",
    "aws_user_pools_web_client_id": "66u8kmqjp59522q3858hqugt7d",
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://ps4ky2nur5crxkjfkldkifixk4.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-2hwjj5un6rempchkqdmjci2vfe",
    "aws_user_files_s3_bucket": "flexpanel6ed38163d00647a6ba3ac8d8dac7f5a4102144-dev",
    "aws_user_files_s3_bucket_region": "us-east-1"
});
import TestTemplate from '../public/test6.json';


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
  // console.log('Test Template',TestTemplate.name);
  return { props : { page : TestTemplate , title : TestTemplate.name , favicon : null , tabList : [] } }
  // console.log('API Params',process.env.GRAPHQL_ENDPOINT);
  // const axios = require('axios');
  // const gql = require('graphql-tag');
  // const graphql = require('graphql');
  // const { print } = graphql;
  
  // const byTabAndScreenSize = gql`
  //   query ByTabAndScreenSize(
  //     $tabID: ID
  //     $breakPoint: ModelStringKeyConditionInput
  //     $sortDirection: ModelSortDirection
  //     $filter: ModelScreensizeFilterInput
  //     $limit: Int
  //     $nextToken: String
  //   ) {
  //     byTabAndScreenSize(
  //       tabID: $tabID
  //       breakPoint: $breakPoint
  //       sortDirection: $sortDirection
  //       filter: $filter
  //       limit: $limit
  //       nextToken: $nextToken
  //     ) {
  //       items {
  //         id
  //         createdAt
  //         updatedAt
  //         breakPoint
  //         tabID
  //         componentID
  //         grids {
  //           items{
  //             id
  //             createdAt
  //             updatedAt
  //             x
  //             y
  //             h
  //             w
  //             minW
  //             minH
  //             maxW
  //             maxH
  //             component {
  //               id
  //               type
  //               name
  //               props
  //               actions
  //               screenDisable
  //               # displayTimeZone
  //               # clockType
  //               # countryCode
  //               # keywords
  //               # dateFilterStart
  //               # dateFilterEnd
  //               # filterLock
  //               # isLive
  //               # twitterOAuthID
  //               grids{
  //                 items {
  //                   id
  //                 }
  //                 nextToken
  //               }
  //               createdAt
  //               updatedAt
  //             }
  //           }
  //           nextToken
  //         }
  //       }
  //       nextToken
  //     }
  //   }
  // `;
  // const byComponentAndScreenSize = gql`
  //   query ByComponentAndScreenSize(
  //     $componentID: ID
  //     $breakPoint: ModelStringKeyConditionInput
  //     $sortDirection: ModelSortDirection
  //     $filter: ModelScreensizeFilterInput
  //     $limit: Int
  //     $nextToken: String
  //   ) {
  //     byComponentAndScreenSize(
  //       componentID: $componentID
  //       breakPoint: $breakPoint
  //       sortDirection: $sortDirection
  //       filter: $filter
  //       limit: $limit
  //       nextToken: $nextToken
  //     ) {
  //       items {
  //         id
  //         createdAt
  //         updatedAt
  //         breakPoint
  //         tabID
  //         componentID
  //         grids {
  //           items{
  //             id
  //             createdAt
  //             updatedAt
  //             x
  //             y
  //             h
  //             w
  //             minW
  //             minH
  //             maxW
  //             maxH
  //             component {
  //               id
  //               type
  //               name
  //               props
  //               actions
  //               screenDisable
  //               # displayTimeZone
  //               # clockType
  //               # countryCode
  //               # keywords
  //               # dateFilterStart
  //               # dateFilterEnd
  //               # filterLock
  //               # isLive
  //               # twitterOAuthID
  //               grids{
  //                 items {
  //                   id
  //                 }
  //                 nextToken
  //               }
  //               createdAt
  //               updatedAt
  //             }
  //           }
  //           nextToken
  //         }
  //       }
  //       nextToken
  //     }
  //   }
  // `;
  // const getPanel = gql`
  //   query GetPanel($id: ID!) {
  //     getPanel(id: $id) {
  //       id
  //       name
  //       availability
  //       createdAt
  //       updatedAt
  //       userID
  //       priority
  //       thumbnail
  //       logo
  //       favicon
  //     }
  //   }
  // `;
  // const getTab = gql`
  //   query GetTab($id: ID!) {
  //     getTab(id: $id) {
  //       id
  //       name
  //       availability
  //       createdAt
  //       updatedAt
  //       panelID
  //       versionID
  //       priority
  //       route
  //       parentID
  //       description
  //       maxWidth
  //       backgroundColor
  //       seo
  //     }
  //   }
  // `;
  // const getVersion = gql`
  //   query GetVersion($id: ID!) {
  //     getVersion(id: $id) {
  //       id
  //       name
  //       major
  //       minor
  //       patch
  //       createdAt
  //       updatedAt
  //       panelID
  //       branch
  //       tabs {
  //         items {
  //           id
  //           name
  //           availability
  //           createdAt
  //           updatedAt
  //           panelID
  //           versionID
  //           priority
  //           route
  //           parentID
  //           description
  //           maxWidth
  //           backgroundColor
  //           seo
  //         }
  //         nextToken
  //       }
  //     }
  //   }
  // `;

  // let tabList = [];
  // let tabScreen = null;
  // let favicon = null;
  // let title = null;
  // let targetTabId = null;

  // const getVersionTab = await axios({
  //   url: process.env.GRAPHQL_ENDPOINT,
  //   method: 'post',
  //   headers: {
  //       'x-api-key': process.env.GRAPHQL_API_KEY
  //   },
  //   data: {
  //       query: print(getVersion),
  //       variables: {
  //         id: process.env.VERSION_ID
  //       }
  //   }
  // });
  // getVersionTab.data.data.getVersion.tabs.items.map((tab)=>{
  //   tabList.push({ id : tab.id , route : tab.route })
  //   // if(tab.id === params.route) targetTabId = tab.id;
  //   // if(tab.route === params.route) targetTabId = tab.id
  // })
  // const rootRoute = getVersionTab.data.data.getVersion.tabs.items.filter((tab)=>tab.route === "");
  // if(rootRoute.length === 1) targetTabId = rootRoute[0]['id'];
  // if(rootRoute.length === 0) targetTabId = getVersionTab.data.data.getVersion.tabs.items[0]['id'];
 
  // console.log('Target Tab ID',targetTabId);

  // const getPanelRequest = await axios({
  //   url: process.env.GRAPHQL_ENDPOINT,
  //   method: 'post',
  //   headers: {
  //       'x-api-key': process.env.GRAPHQL_API_KEY
  //   },
  //   data: {
  //       query: print(getPanel),
  //       variables: {
  //         id: process.env.PANEL_ID
  //       }
  //   }
  // });

  // if(getPanelRequest.data.data.getPanel.favicon !== null){
  //   const faviconSrc = await Storage.get(getPanelRequest.data.data.getPanel.favicon , { level: 'public' });
  //   title = getPanelRequest.data.data.getPanel.name;
  //   let image = await axios.get(faviconSrc, {responseType: 'arraybuffer'});
  //   let returnedB64 = Buffer.from(image.data).toString('base64');
  //   if(returnedB64){
  //     favicon = returnedB64;
  //   }
  // }

  // const getTabRequest = await axios({
  //   url: process.env.GRAPHQL_ENDPOINT,
  //   method: 'post',
  //   headers: {
  //       'x-api-key': process.env.GRAPHQL_API_KEY
  //   },
  //   data: {
  //       query: print(getTab),
  //       variables: {
  //         id : targetTabId
  //       }
  //   }
  // }); 
  // // console.log('Tab Object',getTabRequest.data.data.getTab);
  // const tabGridAccordingtoSize = await axios({
  //   url: process.env.GRAPHQL_ENDPOINT,
  //   method: 'post',
  //   headers: {
  //       'x-api-key': process.env.GRAPHQL_API_KEY
  //   },
  //   data: {
  //       query: print(byTabAndScreenSize),
  //       variables: {
  //         tabID : targetTabId,
  //         // breakPoint: { eq : currentBreakPoint },
  //         limit : 10000
  //       }
  //   }
  // });
  // // console.log('Grid by Tab',tabGridAccordingtoSize.data.data.byTabAndScreenSize);
  // tabScreen = tabGridAccordingtoSize.data.data.byTabAndScreenSize;

  // const recursiveGridCheck = async(grid)=>{
  //   if(grid.component.type === 'grid'){
  //     if(grid.component.props !== null){
  //       let gridItemProps = JSON.parse(grid.component.props);
  //       if(gridItemProps['default']['backgroundImage']){
  //         if(gridItemProps['default']['backgroundImage']['key']){
  //           if(!gridItemProps['default']['backgroundImage']['key'].includes('https://')) {
  //             const imgSrc = await Storage.get(gridItemProps['default']['backgroundImage']['key'] , { level: 'public'  });
  //             let image = await axios.get(imgSrc, {responseType: 'arraybuffer'});
  //             let returnedB64 = Buffer.from(image.data).toString('base64');
  //             if(returnedB64){
  //               gridItemProps['default']['backgroundImage']['image']  = returnedB64;
  //               grid.component.props = JSON.stringify(gridItemProps);
  //             }
  //           };
  //         }
  //       }
  //     }
  //     const componentGridAccordingtoSize = await axios({
  //         url: process.env.GRAPHQL_ENDPOINT,
  //         method: 'post',
  //         headers: {
  //             'x-api-key': process.env.GRAPHQL_API_KEY
  //         },
  //         data: {
  //             query: print(byComponentAndScreenSize),
  //             variables: {
  //               componentID : grid.component.id,
  //               // breakPoint:  { eq : breakPoint },
  //               limit : 10000
  //             }
  //         }
  //     });
  //     if(componentGridAccordingtoSize.data.errors) console.log('GraphQL Error',componentGridAccordingtoSize.data.errors);
  //     const allScreenGrid = await Promise.all(componentGridAccordingtoSize.data.data.byComponentAndScreenSize.items.map(async(screen)=>{
  //       const allScreenGridComp = await Promise.all(screen.grids.items.map(async(grid)=>{
  //         return await recursiveGridCheck(grid);
  //       }))
  //       screen.grids = allScreenGridComp;
  //       return screen;
  //     }))
  //     grid.component.grids.items = allScreenGrid;
  //     return grid;
  //   } else {
  //     if(grid.component.type == 'image' && grid.component.props !== null){
  //       let itemProps = JSON.parse(grid.component.props);
  //       // console.log(imageProps);
  //       if(itemProps['default'] && itemProps['default']['image']){
  //         if(itemProps['default']['image']['key']){
  //             // console.log('New Context',itemProps['default']['image']['key']);
  //             if(!itemProps['default']['image']['key'].includes('https://')) {
  //               // const imgSrc = await s3.getObject({ Bucket: process.env.STORAGE_FLEXPANELSTORAGE_BUCKETNAME, Key: 'public/'+itemProps['default']['image']['key'] }).promise();
  //               const imgSrc = await Storage.get(itemProps['default']['image']['key'] , { level: 'public'  });
  //               let image = await axios.get(imgSrc, {responseType: 'arraybuffer'});
  //               let returnedB64 = Buffer.from(image.data).toString('base64');
  //               if(returnedB64){
  //                 itemProps['default']['image']  = returnedB64;
  //                 grid.component.props = JSON.stringify(itemProps);
  //               }
  //             }
  //         }
  //       }
  //     }
  //     return grid
  //   }
  // }

  // const allScreenGrid = await Promise.all(tabScreen.items.map(async(screen)=>{
  //   // console.log('Tab Screen',screen);
  //   const allScreenGridComp = await Promise.all(screen.grids.items.map(async(grid)=>{
  //     // return recursiveGridCheck(grid);
  //     if(grid.component.type === 'grid'){
  //       // console.log('Tab grid',grid);
  //       // console.log(grid.component.grids);
  //       // const res = await recursiveGridCheck(grid,recursive);
  //       // grid.component.grids.items = recursiveGridCheck(grid,recursive);
  //       // console.log('Res',res);
  //       // grid.component.grids.items = await recursiveGridCheck(grid,recursive);
  //       // grid = await recursiveGridCheck(grid,recursive);
  //       // recursive++;
  //       // grid.
  //       return await recursiveGridCheck(grid);
  //     } else {
  //       // console.log('Recursive End',grid.component.type);
  //       // recursiveEnd++;
  //       return grid;
  //     }

  //   }))
  //   screen.grids.items = allScreenGridComp;
  //   return screen;
  // }))
  // // tabScreen.items = allScreenGrid

  // getTabRequest.data.data.getTab.screens = {};
  // getTabRequest.data.data.getTab.screens.items = allScreenGrid

  // if(getTabRequest.data.data.getTab['backgroundColor'] !== null) getTabRequest.data.data.getTab['backgroundColor'] = JSON.parse(getTabRequest.data.data.getTab['backgroundColor'])
  
  // // console.log(recursive);
  // // console.log(recursiveEnd);
  // console.log('Page Object',getTabRequest.data.data.getTab.screens.items);
  // return { props : { page : getTabRequest.data.data.getTab , tabList : [] , favicon : favicon , title : title } }

  // const uiGenerator = gql`
  //   mutation UiGenerator($panelID: String, $versionID: String, $userID: String) {
  //     uiGenerator(panelID: $panelID, versionID: $versionID, userID: $userID)
  //   }
  // `;
  // const getMainDevVersionUI = await axios({
  //   url: process.env.GRAPHQL_ENDPOINT,
  //   method: 'post',
  //   headers: {
  //       'x-api-key': process.env.GRAPHQL_API_KEY
  //   },
  //   data: {
  //       query: print(uiGenerator),
  //       variables: {
  //         // panelID: process.env.PANEL_ID,
  //         // versionID: process.env.VERSION_ID
  //         panelID: 'a75e23a4-8523-4932-bae2-471566222edd',
  //         versionID:  'd2ad6b9a-3b02-487a-931e-ed5099f13974'
  //       }
  //   }
  // });
  // const uiTemplate = JSON.parse(getMainDevVersionUI.data.data.uiGenerator)['body'];
  // // console.log('UI Template of this Flexpanel Project : ',uiTemplate);
  // let homePage = null;
  // let tabList = uiTemplate.tabs.map((tab)=>{ return { id : tab.id , route : tab.route } });
  // if(uiTemplate.tabs){
  //   homePage = uiTemplate.tabs.filter((tab)=>tab.route === "");
  //   if(homePage.length > 0) homePage = homePage[0];
  //   if(homePage.length === 0) homePage = uiTemplate.tabs[0];
  //   if(homePage['backgroundColor'] !== null) homePage['backgroundColor'] = JSON.parse(homePage['backgroundColor'])
  //   if(homePage['seo'] !== null) homePage['seo'] = JSON.parse(homePage['seo'])
  // }

  // return { props : { page : homePage , title : uiTemplate.name , favicon : uiTemplate.favicon , tabList : tabList } }
}

export default function Home({ page , title , favicon , tabList }) {
  // console.log(page);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{(page.seo && page.seo.ogTitle) ? page.seo.ogTitle :`${page.name} | ${title}`}</title>
        <meta name="description" content={(page.seo && page.seo.ogDescription) ? page.seo.ogDescription : `${(page && page.description) ? page.description : `${title} is an application build with Flexpanel, which is a tool to build software without coding.`}`}/>
        {/* <meta property="og:title" content={(page.seo && page.seo.ogTitle) ? page.seo.ogTitle : `${page.name} | ${title}`} /> */}
        {/* <meta property="og:type" content="website" />
        <meta property="og:type" content="flexpanel.website" />
        <meta property="og:description" content={(page.seo && page.seo.ogDescription) ? page.seo.ogDescription : `${title} is an application build with Flexpanel, which is a tool to build software without coding.`}/> */}
        {/* <meta property="og:image" content={(page.seo && page.seo.ogImg) ? `data:image/png;base64,${page.seo.ogImg}` : null}/> */}
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
