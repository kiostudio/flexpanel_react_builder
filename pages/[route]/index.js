import Head from 'next/head'
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic'
import Grid from '../../src/component/panel/grid';
// import styles from '../styles/Home.module.css'


export async function getStaticPaths() {
    const axios = require('axios');
    const gql = require('graphql-tag');
    const graphql = require('graphql');
    const { print } = graphql;
    let templatePath = [];

    const getPanel = gql`
      query GetPanel($id: ID!) {
        getPanel(id: $id) {
          id
          name
          availability
          createdAt
          updatedAt
          userID
          priority
          thumbnail
          logo
          favicon
        }
      }
    `;
    const getVersion = gql`
      query GetVersion($id: ID!) {
        getVersion(id: $id) {
          id
          name
          major
          minor
          patch
          createdAt
          updatedAt
          panelID
          branch
          tabs {
            items {
              id
              name
              availability
              createdAt
              updatedAt
              panelID
              versionID
              priority
              route
              parentID
              description
              maxWidth
              backgroundColor
              seo
            }
            nextToken
          }
        }
      }
    `;

    // const getPanelRequest = await axios({
    //   url: process.env.GRAPHQL_ENDPOINT,
    //   method: 'post',
    //   headers: {
    //       'x-api-key': process.env.GRAPHQL_API_KEY
    //   },
    //   data: {
    //       query: print(getPanel),
    //       variables: {
    //         id: 'a75e23a4-8523-4932-bae2-471566222edd'
    //       }
    //   }
    // });
    // console.log('getPanelRequest Record Res',getPanelRequest.data.data.getPanel);
    // if(getPanelRequest.data.data.getPanel.favicon !== null){
    //   const favicon = await s3.getObject({ Bucket: process.env.STORAGE_FLEXPANELSTORAGE_BUCKETNAME, Key: 'public/'+getPanelRequest.data.data.getPanel.favicon }).promise();
    //   // console.log(favicon);
    //   if(favicon && favicon.Body){
    //     getPanelRequest.data.data.getPanel.favicon = Buffer.from(favicon.Body).toString('base64');
    //   }
    // }
    const getVersionTab = await axios({
        url: process.env.GRAPHQL_ENDPOINT,
        method: 'post',
        headers: {
            'x-api-key': process.env.GRAPHQL_API_KEY
        },
        data: {
            query: print(getVersion),
            variables: {
              id: '5ffc447b-703e-4032-bb26-570987ad4ad8'
            }
        }
    });

    // console.log('Get Version Tab',getVersionTab.data.data.getVersion);

    getVersionTab.data.data.getVersion.tabs.items.map((tab)=>{
      // templatePath.push({ params : { route : (tab.route !== null && tab.route !== "") ? tab.route : tab.id } })
      templatePath.push({ params : { route : tab.id } })
    })

    console.log('Template Path',templatePath);

    return { paths : templatePath , fallback : false }



    // const axios = require('axios');
    // const gql = require('graphql-tag');
    // const graphql = require('graphql');
    // const { print } = graphql;
    // let templatePath = [];

    // const uiGenerator = gql`
    // mutation UiGenerator($panelID: String, $versionID: String, $userID: String) {
    //         uiGenerator(panelID: $panelID, versionID: $versionID, userID: $userID)
    //     }
    // `;
    // const getMainDevVersionUI = await axios({
    //     url: process.env.GRAPHQL_ENDPOINT,
    //     method: 'post',
    //     headers: {
    //         'x-api-key': process.env.GRAPHQL_API_KEY
    //     },
    //     data: {
    //         query: print(uiGenerator),
    //         variables: {
    //         panelID: process.env.PANEL_ID,
    //         versionID: process.env.VERSION_ID
    //         }
    //     }
    // });
    // const uiTemplate = JSON.parse(getMainDevVersionUI.data.data.uiGenerator)['body'];
    // // console.log('UI Template of this Flexpanel Project : ',uiTemplate);
    // // let renderPage = null;
    // if(uiTemplate.tabs){
    //     uiTemplate.tabs.map((tab)=>templatePath.push({ params : { route : (tab.route !== null && tab.route !== "") ? tab.route : tab.id } }));
    // }
    // return { paths : templatePath , fallback : false }
}

export async function getStaticProps({ params }) {
  const axios = require('axios');
  const gql = require('graphql-tag');
  const graphql = require('graphql');
  const { print } = graphql;

  const byTabAndScreenSize = gql`
    query ByTabAndScreenSize(
      $tabID: ID
      $breakPoint: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelScreensizeFilterInput
      $limit: Int
      $nextToken: String
    ) {
      byTabAndScreenSize(
        tabID: $tabID
        breakPoint: $breakPoint
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          createdAt
          updatedAt
          breakPoint
          tabID
          componentID
          grids {
            items{
              id
              createdAt
              updatedAt
              x
              y
              h
              w
              minW
              minH
              maxW
              maxH
              component {
                id
                type
                name
                props
                actions
                screenDisable
                # displayTimeZone
                # clockType
                # countryCode
                # keywords
                # dateFilterStart
                # dateFilterEnd
                # filterLock
                # isLive
                # twitterOAuthID
                grids{
                  items {
                    id
                  }
                  nextToken
                }
                createdAt
                updatedAt
              }
            }
            nextToken
          }
        }
        nextToken
      }
    }
  `;
  const byComponentAndScreenSize = gql`
    query ByComponentAndScreenSize(
      $componentID: ID
      $breakPoint: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelScreensizeFilterInput
      $limit: Int
      $nextToken: String
    ) {
      byComponentAndScreenSize(
        componentID: $componentID
        breakPoint: $breakPoint
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          createdAt
          updatedAt
          breakPoint
          tabID
          componentID
          grids {
            items{
              id
              createdAt
              updatedAt
              x
              y
              h
              w
              minW
              minH
              maxW
              maxH
              component {
                id
                type
                name
                props
                actions
                screenDisable
                # displayTimeZone
                # clockType
                # countryCode
                # keywords
                # dateFilterStart
                # dateFilterEnd
                # filterLock
                # isLive
                # twitterOAuthID
                grids{
                  items {
                    id
                  }
                  nextToken
                }
                createdAt
                updatedAt
              }
            }
            nextToken
          }
        }
        nextToken
      }
    }
  `;
  const getTab = gql`
    query GetTab($id: ID!) {
      getTab(id: $id) {
        id
        name
        availability
        createdAt
        updatedAt
        panelID
        versionID
        priority
        route
        parentID
        description
        maxWidth
        backgroundColor
        seo
      }
    }
  `;

  const getTabRequest = await axios({
    url: process.env.GRAPHQL_ENDPOINT,
    method: 'post',
    headers: {
        'x-api-key': process.env.GRAPHQL_API_KEY
    },
    data: {
        query: print(getTab),
        variables: {
          id : params.route
        }
    }
  }); 
  // console.log('Tab Object',getTabRequest.data.data.getTab);

  let tabScreen = null;
  const tabGridAccordingtoSize = await axios({
    url: process.env.GRAPHQL_ENDPOINT,
    method: 'post',
    headers: {
        'x-api-key': process.env.GRAPHQL_API_KEY
    },
    data: {
        query: print(byTabAndScreenSize),
        variables: {
          tabID : params.route,
          // breakPoint: { eq : currentBreakPoint },
          limit : 10000
        }
    }
  });
  // console.log('Grid by Tab',tabGridAccordingtoSize.data.data.byTabAndScreenSize);
  tabScreen = tabGridAccordingtoSize.data.data.byTabAndScreenSize;

  let recursive = 0;
  let recursiveEnd = 0;

  const recursiveGridCheck = async(grid,recursive)=>{
    if(grid.component.type === 'grid'){
      const componentGridAccordingtoSize = await axios({
          url: process.env.GRAPHQL_ENDPOINT,
          method: 'post',
          headers: {
              'x-api-key': process.env.GRAPHQL_API_KEY
          },
          data: {
              query: print(byComponentAndScreenSize),
              variables: {
                componentID : grid.component.id,
                // breakPoint:  { eq : breakPoint },
                limit : 10000
              }
          }
      });
      // console.log('All Grid Component',componentGridAccordingtoSize.status);
      // console.log('All Grid Component',componentGridAccordingtoSize.data.errors);
      // console.log('All Grid Component',componentGridAccordingtoSize.data.data.byComponentAndScreenSize);
      // console.log('All Grid Component',componentGridAccordingtoSize.data.data.byComponentAndScreenSize.items[0]);
      const allScreenGrid = await Promise.all(componentGridAccordingtoSize.data.data.byComponentAndScreenSize.items.map(async(screen)=>{
        const allScreenGridComp = await Promise.all(screen.grids.items.map(async(grid)=>{
          return recursiveGridCheck(grid,recursive);
        }))
        screen.grids = allScreenGridComp;
        return screen;
      }))
      grid.component.grids.items = allScreenGrid;
      return grid;
    } else {

      return grid
    }
  }

  const allScreenGrid = await Promise.all(tabScreen.items.map(async(screen)=>{
    // console.log('Tab Screen',screen);
    const allScreenGridComp = await Promise.all(screen.grids.items.map(async(grid)=>{
      // return recursiveGridCheck(grid);

      if(grid.component.type === 'grid'){
        // console.log('Tab grid',grid);
        // console.log(grid.component.grids);
        // const res = await recursiveGridCheck(grid,recursive);
        // grid.component.grids.items = recursiveGridCheck(grid,recursive);
        // console.log('Res',res);
        // grid.component.grids.items = await recursiveGridCheck(grid,recursive);
        // grid = await recursiveGridCheck(grid,recursive);
        recursive++;
        // grid.
        return recursiveGridCheck(grid,recursive);
      } else {
        // console.log('Recursive End',grid.component.type);
        recursiveEnd++;
        return grid;
      }

    }))
    screen.grids.items = allScreenGridComp;
    return screen;
  }))
  // tabScreen.items = allScreenGrid

  getTabRequest.data.data.getTab.screens = {};
  getTabRequest.data.data.getTab.screens.items = allScreenGrid
  
  // console.log(recursive);
  // console.log(recursiveEnd);
  console.log('Page Object',getTabRequest.data.data.getTab.screens.items);
  return { props : { page : getTabRequest.data.data.getTab , tabList : [] } }


  // const axios = require('axios');
  // const gql = require('graphql-tag');
  // const graphql = require('graphql');
  // const { print } = graphql;

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
  //         panelID: process.env.PANEL_ID,
  //         versionID: process.env.VERSION_ID
  //       }
  //   }
  // });
  // const uiTemplate = JSON.parse(getMainDevVersionUI.data.data.uiGenerator)['body'];
  // // console.log('UI Template of this Flexpanel Project : ',uiTemplate);
  // let renderPage = null;
  // if(uiTemplate.tabs){
  //   renderPage = uiTemplate.tabs.filter((tab)=>{
  //       if(tab.route !== null && tab.route !== ""){
  //           return(tab.route == params.route)
  //       } else {
  //           return(tab.id == params.route)
  //       }
  //   })[0];
  //   // if(renderPage.length === 0) homePage = uiTemplate.tabs[0];
  //   if(renderPage['backgroundColor'] !== null) renderPage['backgroundColor'] = JSON.parse(renderPage['backgroundColor'])
  // }

  // return { props : { page : renderPage , title : uiTemplate.name , favicon : uiTemplate.favicon } }
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

// Problems to solve :
// 1. Image Processing
// 2. Tablist
// 3. Title / Description / SEO

// export default function Home({ page }) {
//     console.log(page);
//     const router = useRouter();
//     return (
//       <div>
//         <Head>
//         </Head>
//         <main style={{
//           ...styles.mainContainer,
//         }}>
//           <h1>{'Test New Mechanism'}</h1>
//         </main>
//       </div>
//     )
//   }
export default function Home({ page , tabList, title , favicon }) {
  console.log('Page',page);
  const router = useRouter();
  return (
    <div>
      <Head>
        {/* <title>{`${page.name} | ${title}`}</title> */}
        {/* <meta name="description" content={`${(page && page.description) ? page.description : `${title} is an application build with Flexpanel, which is a tool to build software without coding.`}`}/> */}
        {/* <link rel="icon" href={(favicon !== null) ? `data:image/png;base64,${favicon}` :"/favicon.ico"}/> */}
      </Head>
      <main style={{
        ...styles.mainContainer,
        // backgroundColor : (page && page['backgroundColor']) ? `rgba(${page['backgroundColor'].r},${page['backgroundColor'].g},${page['backgroundColor'].b},${page['backgroundColor'].a})`  : '#E4E4E4',
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
