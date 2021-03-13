import { useEffect , useState , useMemo , useRef , createRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import { API , Storage } from 'aws-amplify';
// import { Button , Alert , Classes , ButtonGroup , Icon } from "@blueprintjs/core";
// import DateTimeWidget from '../widget/dateTimeWidget';
// import TwitterTrendTable from '../widget/twitterTrendTableWidget';
// import TwitterChartWidget from '../widget/twitterChartWidget';
// import TwitterOAuth from '../widget/twitterOAuth';
// import CronJobBoard from '../widget/cronJob';
// import DragHandler from '../widget/tools/dragHandler';
import GridWidget from '../widget/gridWidget';
// import { byTabAndScreenSize } from '../../graphql/queries';
// import { createGrid , createComponent , updateGrid , updatePanel , deleteGrid , createScreensize } from '../../graphql/mutations';
// import { ImTablet , ImLaptop , ImMobile2 } from 'react-icons/im';
import { basicWidgetsLayout } from '../widget/schema/widgetLayout';
// import html2canvas from 'html2canvas';
// import Compressor from 'compressorjs';
// const ResponsiveGridLayout = WidthProvider(Responsive);

const layoutBreakPoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};

// Have to generate Grid first, then generate layout

const renderWidget = (item,router)=>{
  switch (item.component.type) {
    // case "dateTimeWidget":
    //   return (
    //       <DateTimeWidget grid={item} userRole={userRole} setDragEnable={setDragEnable}/>
    //   )
    //   break;
    // case "twitterTrendTable":
    //   return (
    //     <TwitterTrendTable item={item} userRole={userRole} chartMode={false} setError={setError} setDragEnable={setDragEnable}/>
    //   )
    //   break;
    // case "twitterTrendChart":
    //   if(item.component.keywords && item.component.keywords.length > 0){
    //     return <TwitterChartWidget item={item} userRole={userRole} reload={reload} setError={setError} deviceAgent={deviceAgent} setDragEnable={setDragEnable}/>
    //   } else {
    //     return <TwitterTrendTable item={item} userRole={userRole} chartMode={true} reload={reload} setError={setError} setDragEnable={setDragEnable}/>
    //   }
    //   break;
    // case "twitterOAuth":
    //     return(<TwitterOAuth item={item} userRole={userRole} userID={userID} setDragEnable={setDragEnable}/>)
    //   break;
    // case "cronJob":
    //     return(<CronJobBoard item={item} userRole={userRole} userID={userID} setDragEnable={setDragEnable}/>)
    //   break;
    case "grid":
        return (
            <GridWidget 
              item={item}
              router={router}
            />
          )
      break;
    default:
      break;
  }
}

function Grid({ page, title, router, pageId }) {
  // const [trend, setTrend] = useState([]);
  // const [twitterTrends,setTwitterTrend] = useState([]);
  // const [keyword, setKeyword] = useState(null);
  // const [tabScreen,setTabScreen] = useState([]);
  const [currentBreakPoint,setCurrentBreakPoint] = useState(null);
  // const [grid,setGrid] = useState(null);
  const [layouts,setLayouts] = useState(null);
  // const [lastLayoutUpdated,setLastLayoutUpdated] = useState(null);
  // const [alertOpen,setAlertOpen] = useState(false);
  // const [deleteGrid,setDeleteGrid]  = useState(null);
  // const [dragEnable,setDragEnable] = useState(false);
  // const [widgetLayout] = useState(JSON.parse(JSON.stringify(basicWidgetsLayout)));
  const ref = useRef(null);
  // const [elementRef,setElementRef] = useState(null);
  // let elementsRef = null;

  // useLayoutEffect(() => {
  //   if (targetRef.current) {
  //     setDimensions({
  //       width: targetRef.current.offsetWidth,
  //       height: targetRef.current.offsetHeight
  //     });
  //   }
  // }, []);

  useEffect(()=>{
    // setGrid([{i: 'loading' }]);
    const sortedBreakpoints = Object.keys(layoutBreakPoints).sort(
      (breakpoint1, breakpoint2) =>
      layoutBreakPoints[breakpoint1] - layoutBreakPoints[breakpoint2]
    );
    let breakpoint = sortedBreakpoints[0];
    for (let i = 0; i < sortedBreakpoints.length; i++) {
        const currentBreakpoint = sortedBreakpoints[i];
        const nextBreakpoint = sortedBreakpoints[i + 1];
        if (
            typeof nextBreakpoint === "undefined" ||
            (layoutBreakPoints[currentBreakpoint] <= window.innerWidth &&
              window.innerWidth <= layoutBreakPoints[nextBreakpoint])
        ) {
            breakpoint = currentBreakpoint;
            break;
        }
    }
    console.log('init width',window.innerWidth,sortedBreakpoints,breakpoint);
    setCurrentBreakPoint(breakpoint);
  },[]);
  useEffect(()=>{
    if(currentBreakPoint != null){
      let pageLayout = {
        lg : [],
        md : [],
        sm : [],
        xs : [],
        xxs : []
      }
      
      page.screens.items.map((screen)=>{
        screen.grids.items.map(async(gridItem)=>{
          gridItem['i'] = gridItem.id;
          if(gridItem.component.props) gridItem.component.props = JSON.parse(gridItem.component.props);
          if(gridItem.component.actions) gridItem.component.actions = JSON.parse(gridItem.component.actions);
        });
        pageLayout[screen.breakPoint] = screen.grids.items
      })
      console.log('Page Layout',pageLayout);
      setLayouts(pageLayout);
      // console.log('Tab Grid Res :',tabGridAccordingtoSize,currentBreakPoint);
      // let displayGrid = null;
      // let displayLayout = {
      //   lg : [],
      //   md : [],
      //   sm : [],
      //   xs : [],
      //   xxs : []
      // }
      // let screens = {};
      // tabGridAccordingtoSize.data.byTabAndScreenSize.items.map((screen)=>{
        // if (screen.breakPoint === currentBreakPoint) {
        //   screen.grids.items.map(async(gridItem)=>{
        //     gridItem['i'] = gridItem.id;
        //     if(gridItem.component.props) gridItem.component.props = JSON.parse(gridItem.component.props);
        //     if(gridItem.component.actions) gridItem.component.actions = JSON.parse(gridItem.component.actions);
        //     console.log('Grid Props',gridItem.component.props);
        //     if(gridItem.component.props && gridItem.component.props['backgroundImage'] && gridItem.component.props['backgroundImage']['key'] && !gridItem.component.props['backgroundImage']['key'].includes('https://')){
        //           console.log('Background Image  Grid : ',gridItem.component.props['backgroundImage']);
        //           gridItem.component.props['backgroundImage'] = await Storage.get(gridItem.component.props['backgroundImage']['key'] , { level: 'public' });
        //         }
        //     gridItem.static = true;
        //     delete gridItem.id;
        //     if(userRole == 'guest' || userRole == 'logedin') gridItem.static = true
        //   });
        //   displayGrid = screen.grids.items
        // };
      //   displayLayout[screen.breakPoint] = screen.grids.items;
      //   screens[screen.breakPoint] =  screen.id ;
      // })
      // // console.log(screens);
      // // console.log(displayGrid);
      // setTabScreen(screens);
      // // setGrid(displayGrid);
      // // console.log(displayLayout);
      // setLayouts((layout)=>{
      //   let newLayout = Object.assign({}, layout)
      //   newLayout[currentBreakPoint] = displayGrid;
      //   return displayLayout;
      // });

    }
  },[currentBreakPoint])

  // useEffect(()=>{
  //   console.log('Load Tab Grid',currentBreakPoint,tabId,window.innerWidth);
  //   if(currentBreakPoint != null && tabId != null) {
  //     // console.log('Load Tab Grid')
  //     // setLayouts(loadingLayout);
  //     // getTabGrid(setGrid,tabId,currentBreakPoint,setLayouts,setTabScreen,userRole,setError);
  //   }
  // },[currentBreakPoint,tabId])
  // useEffect(()=>{
    // console.log('Layout',layouts[currentBreakPoint]);
    // if(currentBreakPoint !== null && layouts[currentBreakPoint] != null) setGrid(layouts[currentBreakPoint])
  // },[layouts,currentBreakPoint])
  const children = useMemo(() => {
    if(currentBreakPoint != null && layouts != null){
      // console.log('Layouts',layouts,currentBreakPoint);
      return layouts[currentBreakPoint].map((item,index)=>{
        return (item.i == 'loading') ? 
          <div key={item.i} className={Classes.SKELETON} style={styles.skeletonContainer}></div> : 
          <div
            key={item['id']} 
            style={{
              ...styles.gridItem,
              backgroundColor : (item.component.type !== 'grid') ? '#282c34' : 'transparent'
            }}>
            {renderWidget(item,router)}
            {/* {(index == layouts[currentBreakPoint].length - 1) ? <div ref={ref} style={{ position : 'absolute' , bottom : 0 }}></div> : null} */}
          </div>
      })
    }
  }, [layouts,currentBreakPoint]);

  const [width,setWidth] = useState((page['maxWidth']) ?  page['maxWidth'] : 1440);
  const [windowWith,setWindowWidth] = useState(null);
  // useEffect(()=>{
  //   setWidth((displayTab && tabId && displayTab.filter((tab)=>tab.id == tabId).length === 1 && displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth']) ?  displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth'] : 1440);
  // },[displayTab])
  useEffect(()=>{
      // console.log('Window  width', window.innerWidth);
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', ()=>{
        // console.log('Resize',window.innerWidth);
        setWindowWidth(window.innerWidth)
      });
      // return () => window.removeEventListener('resize');
  },[])
  // useEffect(()=>{
  //   setSelectedGrid(null);
  // },[width,tabId])
  return (layouts && windowWith) ? (
    <div
      style={{
        width : '100%',
        height : '100%',
        display : 'flex',
        flexDirection : 'column',
        alignItems  :'center'
      }}
    >
      <div 
        style={{
          ...styles.mainContainer,
          width : '100%',
          // width : (displayTab && tabId && displayTab.filter((tab)=>tab.id == tabId).length === 1 && displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth']) ?  `${displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth']}px` : '1440px',
          maxWidth : width,
          overflowY : 'hidden',
          overflowX : 'hidden',
          // backgroundColor : 'red'
          // maxWidth : (displayTab && tabId && displayTab.filter((tab)=>tab.id == tabId).length === 1 && displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth']) ?  `${displayTab.filter((tab)=>tab.id == tabId)[0]['maxWidth']}px` : '1440px',
          // maxWidth : (userRole === 'owner') ? '1300px' : '100%'
          // width : (userRole === 'owner') ? '1250px' : '100%'
        }}
      >
        <Responsive 
          width={windowWith}
          className="layout" 
          isDraggable={false}
          isDroppable={false}
          isResizable={false}
          // compactType={['vertical','horizontal']}
          margin={[0,0]}
          rowHeight={10}
          style={{
            ...styles.mainGridContainer,
            // height : (deviceAgent.platform.type == "desktop") ?(deviceAgent.os.name == "Windows") ? '78vh' : '100%' : '100%',
            height : '100%',
            backgroundColor : (page['backgroundColor']) ? `rgba(${page['backgroundColor'].r},${page['backgroundColor'].g},${page['backgroundColor'].b},${page['backgroundColor'].a})`  : '#E4E4E4',
            border: 'none'
          }}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          layouts={layouts}
          onWidthChange={(width)=>{
            const sortedBreakpoints = Object.keys(layoutBreakPoints).sort(
              (breakpoint1, breakpoint2) =>
              layoutBreakPoints[breakpoint1] - layoutBreakPoints[breakpoint2]
            );
            let breakpoint = sortedBreakpoints[0];
            for (let i = 0; i < sortedBreakpoints.length; i++) {
                const currentBreakpoint = sortedBreakpoints[i];
                const nextBreakpoint = sortedBreakpoints[i + 1];
                if (
                    typeof nextBreakpoint === "undefined" ||
                    (layoutBreakPoints[currentBreakpoint] <= width &&
                        width <= layoutBreakPoints[nextBreakpoint])
                ) {
                    breakpoint = currentBreakpoint;
                    break;
                }
            }
            console.log('init width',width,sortedBreakpoints,breakpoint);
            setCurrentBreakPoint(breakpoint);
          }}
          >
            {children}
        </Responsive>
      </div>
    </div>
    ) : null
}


const styles = {
    mainContainer : {
      height : '100%',
      overflowY : 'hidden',
      overflowX : 'hidden',
      // paddingBottom : 10
    },
    mainGridContainer : {
        backgroundColor : '#FFFFFF',
        // outline : '#A0A0A0 solid 10px',
        // height : '78vh',
        overflowY : 'scroll',
        overflowX : 'scroll',
        width : '100%'
    },
    skeletonContainer : {
      display : 'flex',
      flex : 1,
      alignSelf : 'stretch',
      marginTop : 10
    },
    closeBarContainer : {
      display : 'flex',
      flexDirection : 'row',
      flex : 1,
      // backgroundColor : 'blue',
      alignItems : 'center',
      justifyContent : 'flex-end'
    },
    // closeButton : {
    //     margin : 5,
    //     position : 'absolute',
    //     right : 0,
    //     top : 0,
    //     zIndex : 100
    // },
    gridItem : { 
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'
    },
    screenButtonDiv : { 
      display : 'flex',
      flex : 1,
      alignSelf : 'stretch',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'flex-end',
      marginBottom : 5
    }
}

export default Grid;