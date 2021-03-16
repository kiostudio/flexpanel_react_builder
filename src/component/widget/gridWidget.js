import { useEffect , useState , useMemo , useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import { Responsive } from 'react-grid-layout';
// import GridLayout from 'react-grid-layout';
// import DateTimeWidget from '../widget/dateTimeWidget';
// import TwitterTrendTable from '../widget/twitterTrendTableWidget';
// import TwitterChartWidget from '../widget/twitterChartWidget';
// import TwitterOAuth from '../widget/twitterOAuth';
// import CronJobBoard from '../widget/cronJob';
import HeaderWidget from './headerWidget';
import TextWidget from './textWidget';
import ImageWidget from './imageWidget';
import GoogleMapWidget from './googleMapWidget';
// import DragHandler from './tools/dragHandler';
// import { API , Storage } from 'aws-amplify';
// import { Icon, Button , Alert , Classes } from "@blueprintjs/core";
// import { byComponentAndScreenSize } from '../../graphql/queries';
// import { createGrid , createComponent , updateGrid , updatePanel , deleteGrid , createScreensize } from '../../graphql/mutations';
import VideoWidget from './videoWidget';
import ButtonWidget from './buttonWidget';
import { basicWidgetsLayout } from './schema/widgetLayout';
// const ResponsiveGridLayoutWidget = WidthProvider(Responsive);

const layoutBreakPoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};

const renderWidget = (item,router,currentBreakPoint,renderComponentState,tabList)=>{
  switch (item.component.type) {
    // case "dateTimeWidget":
    //   return (
    //       <DateTimeWidget grid={item} userRole={userRole}/>
    //   )
    //   break;
    // case "twitterTrendTable":
    //   return (
    //     <TwitterTrendTable item={item} userRole={userRole} chartMode={false} setError={setError} />
    //   )
    //   break;
    // case "twitterTrendChart":
    //   if(item.component.keywords && item.component.keywords.length > 0){
    //     return <TwitterChartWidget item={item} userRole={userRole} reload={null} setError={setError} deviceAgent={deviceAgent}/>
    //   } else {
    //     return <TwitterTrendTable item={item} userRole={userRole} chartMode={true} reload={null} setError={setError}/>
    //   }
    //   break;
    // case "twitterOAuth":
    //     return(<TwitterOAuth item={item} userRole={userRole} userID={userID}/>)
    //   break;
    // case "cronJob":
    //     return(<CronJobBoard item={item} userRole={userRole} userID={userID}/>)
    //   break;
    case "grid":
        return (
          <GridWidget 
              item={item}
              router={router}
            />
          );
      break;
    case "header":
        return (
          <HeaderWidget 
            componentState={renderComponentState}
            props={(item.component.props) ? item.component.props : {}} 
            item={item}
            currentBreakPoint={currentBreakPoint} 
          />
        )
      break;
    case "text":
          return(
            <TextWidget 
              componentState={renderComponentState}
              props={(item.component.props) ? item.component.props : {}} 
              item={item} 
              currentBreakPoint={currentBreakPoint}
            />
          )
      break;
    case "image":
      return(
        <ImageWidget 
          router={router}
          itemProps={(item.component.props) ? item.component.props : {}} 
          itemActions={(item.component.actions) ? item.component.actions : {}} 
          item={item} 
          tabList={tabList}
          // props={(item.component.props && item.component.props[renderComponentState]) ? item.component.props[renderComponentState] : {}} 
        />
      )
    break;
    case "video":
      return(
        <VideoWidget 
          props={(item.component.props && item.component.props[renderComponentState]) ? item.component.props[renderComponentState] : {}}
        />
      )
    break;
    case "button":
      return(
        <ButtonWidget 
          // componentState={renderComponentState}
          router={router}
          itemProps={(item.component.props) ? item.component.props : {}} 
          itemActions={(item.component.actions) ? item.component.actions : {}} 
          item={item}
          tabList={tabList}
        />
      )
    break;
    case "googleMap":
        return(
          <GoogleMapWidget
            itemProps={(item.component.props) ? item.component.props : {}} 
            itemActions={(item.component.actions) ? item.component.actions : {}} 
            item={item} 
          />
        )
    break;
    default:
        return(<div>{item.component.id}</div>)
      break;
  }
}

// const getImage = async(imageProps,setBackgroundImg)=>{
//   if(imageProps['key'] && !imageProps['key'].includes('https://')){
//       console.log('Image : ',imageProps['image']);
//       const url = await Storage.get(imageProps['key'] , { level: 'public' });
//       setBackgroundImg(url);
//   } else {
//     setBackgroundImg(imageProps);
//   }
// }

function GridWidget({item,router,width,tabList}) {
    // const [grid,setGrid] = useState(null);
    const [layouts,setLayouts] = useState(null);
    const [currentBreakPoint,setCurrentBreakPoint] = useState(null);
    const [gridWidth,setGridWidth] = useState(null);
    const [screenSizes,setScreenSizes] = useState([]);
    // const [alertOpen,setAlertOpen] = useState(false);
    // const [deleteGrid,setDeleteGrid]  = useState(null);
    // const [dragEnable,setDragEnable] = useState(false);
    const [backgroundImg,setBackgroundImg] = useState(null);
    const [backgroundImgBlur,setBackgroundImgBlur] = useState(null);
    const [backgroundImgOpacity,setBackgroundImgOpacity] = useState(null);
    const [backgroundVideo,setBackgroundVideo] = useState(null);
    const [backgroundPattern,setBackgroundPattern] = useState(null);
    const [overlayColor,setOverlayColor] = useState(null);
    const [overlayGradient,setOverlayGradient] = useState(null);
    const [renderComponentState,setRenderComponentState] = useState('default');
    // const [cloneChildrenCommand,setCloneChildrenCommand] = useState((item.cloneChildren && item.cloneChildren.status === true) ? item.cloneChildren : false);
    // const [widgetLayout] = useState(JSON.parse(JSON.stringify(basicWidgetsLayout)));
    const ref = useRef(null);
    const videoWrapperRef = useRef(null);
    useEffect(()=>{
      // console.log('Grid Width',gridWidth)
      if(gridWidth !== null){
        // console.log('This Grid',item,selectedGrid);
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
                (layoutBreakPoints[currentBreakpoint] <= gridWidth &&
                  gridWidth <= layoutBreakPoints[nextBreakpoint])
            ) {
                breakpoint = currentBreakpoint;
                break;
            }
        }
        // console.log('Update BreakPoint',breakpoint);
        setCurrentBreakPoint(breakpoint);
      }
    },[gridWidth])
    useEffect(()=>{
      // if(currentBreakPoint !== null) {
        console.log('Grid Widget',item);
        let pageLayout = {
          lg : [],
          md : [],
          sm : [],
          xs : [],
          xxs : []
        }        
        item.component.grids.items.map((screen)=>{
          // screens.map((screen)=>{
            screen.grids.map((gridItem)=>{
              gridItem['i'] = gridItem.component.id;
              if(gridItem.component.props && typeof gridItem.component.props === 'string') gridItem.component.props = JSON.parse(gridItem.component.props);
              if(gridItem.component.actions && typeof gridItem.component.actions === 'string') gridItem.component.actions = JSON.parse(gridItem.component.actions);
              if(gridItem.component.screenDisable && typeof gridItem.component.screenDisable === 'string') gridItem.component.screenDisable = JSON.parse(gridItem.component.screenDisable);
            })
            pageLayout[screen.breakPoint] = screen.grids; 
          // });
          //   screen.grids.items.map(async(gridItem)=>{
          //     gridItem['i'] = gridItem.id;
          //     if(gridItem.component.props) gridItem.component.props = JSON.parse(gridItem.component.props);
          //     if(gridItem.component.actions) gridItem.component.actions = JSON.parse(gridItem.component.actions);
          //   });
          //   pageLayout[screen.breakPoint] = screen.grids.items
        })
        console.log('Page Layout',pageLayout);
        setLayouts(pageLayout);
        // setGrid(loadingLayout[currentBreakPoint]);
        // setLayouts(loadingLayout);
        // getGridWidgetScreen(item.component.id,currentBreakPoint,setGrid,setLayouts,userRole,setScreenSizes)
      // }
    },[])
    useEffect(()=>{
      // console.log('Check Grid Props',item.component.props);
      if(item.component.props && item.component.props[renderComponentState]){
        // Configure Background Image
        if(item.component.props[renderComponentState]['backgroundImage']){
          if(item.component.props[renderComponentState]['backgroundImage']['key']){
            console.log('New Context',item.component.props[renderComponentState]['backgroundImage']['key']);
            if(item.component.props[renderComponentState]['backgroundImage']['key'].includes('https://')) {
              setBackgroundImg(item.component.props[renderComponentState]['backgroundImage'])
            } else {
              setBackgroundImg(`data:image/png;base64,${item.component.props[renderComponentState]['backgroundImage']['image']}`)
            };
          } else {
            setBackgroundImg(item.component.props[renderComponentState]['backgroundImage']);
          }
        } else {
          setBackgroundImg(null);
        }
        // Configure BackgroundImafge Blur
        if(item.component.props[renderComponentState]['backgroundImageBlur']){
          setBackgroundImgBlur(item.component.props[renderComponentState]['backgroundImageBlur'])
        } else {
          setBackgroundImgBlur(null);
        }
        // Configure BackgroundImafge Opacity
        if(item.component.props[renderComponentState]['backgroungImgOpacity']){
          setBackgroundImgOpacity(item.component.props[renderComponentState]['backgroungImgOpacity'])
        } else {
          setBackgroundImgOpacity(1);
        }
        // Configure Background Video
        if(item.component.props[renderComponentState]['backgroundVideo']){
          setBackgroundVideo(item.component.props[renderComponentState]['backgroundVideo'])
        } else {
          setBackgroundVideo(null);
        }
        // Configure Background Pattern
        if(item.component.props[renderComponentState]['backgroundPattern']){
          setBackgroundPattern(item.component.props[renderComponentState]['backgroundPattern'])
        } else {
          setBackgroundPattern(null);
        }
        // Configure OverlayColor Color
        if(item.component.props[renderComponentState]['overlayColor']){
          setOverlayColor(item.component.props[renderComponentState]['overlayColor'])
        } else {
          setOverlayColor(null);
        }
        // Configure OverlayColor Gradient
        if(item.component.props[renderComponentState]['overlayGradient']){
          setOverlayGradient(item.component.props[renderComponentState]['overlayGradient'])
        } else {
          setOverlayGradient(null);
        }
      }
    },[])
    const children = useMemo(() => {
      // grid,setDragEnable,userRole,deviceAgent,userID,selectedGrid,currentBreakPoint
      // console.log(currentBreakPoint);
      if(layouts != null && currentBreakPoint !== null){
        let targetLayout = layouts[currentBreakPoint];
        // console.log(targetLayout)
        targetLayout = targetLayout.filter((item)=>!(item.component && item.component.screenDisable && item.component.screenDisable !== null && item.component.screenDisable.filter((screen)=>screen === currentBreakPoint).length > 0));
        return targetLayout.map((item)=>{
          return (item.i == 'loading') ? 
            <div key={'loading'} className={Classes.SKELETON} style={styles.skeletonContainer}></div> : 
            <div 
              key={item.i} 
              style={{
                ...styles.gridItem,
                border : "none",
            }}>
                {renderWidget(item,router,currentBreakPoint,renderComponentState,tabList)}
            </div>
        })
      }
    },[layouts,currentBreakPoint])
    useEffect(()=>{
      if(ref.current !== null){
        // console.log('Set Grid Width',ref.current)
        // console.log('Width Change : ',ref.current.offsetWidth);
        setGridWidth(ref.current.offsetWidth);
        // console.log(ref.current.offsetWidth);
      }
    })
    useEffect(()=>{
      // console.log('Window  width', window.innerWidth);
      setGridWidth(window.innerWidth)
      window.addEventListener('resize', ()=>{
        // console.log('Resize',window.innerWidth);
        setGridWidth(window.innerWidth)
      });
      // return () => window.removeEventListener('resize');
    },[])
    const renderBackgroundImage = useMemo(()=>{
      return (backgroundImg) ?<div
        style={{
          position : 'absolute',
          ...styles.mainContainer, 
          backgroundImage : (backgroundImg) ? `url(${backgroundImg})` : null,
          backgroundRepeat : 'no-repeat',
          backgroundSize : 'cover',
          backgroundPosition : 'center',
          filter : `blur(${(backgroundImgBlur) ? backgroundImgBlur : 0}px)`,
          opacity : backgroundImgOpacity
        }}
      ></div> : null
    },[backgroundImg,backgroundImgBlur,backgroundImgOpacity])
    const renderBackgroundVideo = useMemo(()=>{
      // if(videoWrapperRef.current) console.log(backgroundVideo,videoWrapperRef.current.offsetWidth);
      // if(videoWrapperRef.current) console.log(backgroundVideo,ref.current.offsetWidth);
      return <div ref={videoWrapperRef} style={{ position : 'absolute', overflow : 'hidden' , width : '100%' , height : '100%'  }}>
        {
          (backgroundVideo) ?
            (backgroundVideo.includes('https://youtu.be')) ? 
              (videoWrapperRef.current) ?
                 <iframe style={{
                    position : 'absolute',
                    top : 0,
                    left : 0,
                    // height : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetWidth * 1.2 / 16 * 9 : '100%',
                    // width : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetWidth * 1.2 : '100%',
                    height : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetHeight * 1  : '100%',
                    width : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetHeight * 1 / 9 * 16 : '100%',
                    objectFit : 'cover',
                    // objectPosition : '50% 50%'
                    // ...styles.mainContainer
                  }} src={`https://www.youtube.com/embed${backgroundVideo.replace('https://youtu.be','')}?controls=0&autoplay=${1}&mute=1&loop=${1}&rel=0&playlist=${backgroundVideo.replace('https://youtu.be/','')}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 
                  : null
            : 
              <video
                style={{
                  position : 'absolute',
                  top : 0,
                  left : 0,
                  width : '100%',
                  height : '100%',
                  objectFit : 'cover'
                  // ...styles.mainContainer
                }}
                id="background-video" loop={1} autoPlay muted>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>  
          : null
        }
      </div>
    },[backgroundVideo,videoWrapperRef.current,ref])
    const renderPatternBackground = useMemo(()=>{
      return (backgroundPattern) ?<div
          style={{
            position : 'absolute',
            ...styles.mainContainer,
            ...backgroundPattern.style
            // filter : 'blur(1px)'
          }}
        ></div> : null
    },[backgroundPattern])
    const renderOverlayColor = useMemo(()=>{
      return (overlayColor) ?<div
        style={{
          position : 'absolute',
          ...styles.mainContainer,
          backgroundColor: `rgba(${overlayColor.r},${overlayColor.g},${overlayColor.b},${overlayColor.a})`
        }}
      ></div> : null
    },[overlayColor])
    const renderOverlayGradient = useMemo(()=>{
      return (overlayGradient) ?<div
        style={{
          position : 'absolute',
          ...styles.mainContainer,
          ...overlayGradient.style
          // filter : 'blur(1px)'
        }}
      ></div> : null
    },[overlayGradient])
    // console.log('This Component',item.component);
    // console.log(selectedGrid,item,selectedGrid && selectedGrid.component.id === item.component.id);
    let gridWidgetStyle = {
        ...styles.mainContainer,
        outline : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['outlineWidth'] && item.component.props[renderComponentState]['outlineWidth'] > 0) ? `${item.component.props[renderComponentState]['outlineWidth']}px ${(item.component.props[renderComponentState]['outlineType'])? item.component.props[renderComponentState]['outlineType'] : 'solid'} rgba(${(!item.component.props[renderComponentState]['outlineColor']) ? 0 : item.component.props[renderComponentState]['outlineColor'].r},${(!item.component.props[renderComponentState]['outlineColor']) ? 0 : item.component.props[renderComponentState]['outlineColor'].g},${(!item.component.props[renderComponentState]['outlineColor']) ? 0 : item.component.props[renderComponentState]['outlineColor'].b},${(!item.component.props[renderComponentState]['outlineColor']) ? 1 : item.component.props[renderComponentState]['outlineColor'].a}` : "none",
        backgroundColor : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['backgroundColor']) ?`rgba(${item.component.props[renderComponentState]['backgroundColor'].r},${item.component.props[renderComponentState]['backgroundColor'].g},${item.component.props[renderComponentState]['backgroundColor'].b},${item.component.props[renderComponentState]['backgroundColor'].a})` : '#FFFFFF',
        marginTop : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['marginTop']) ? item.component.props[renderComponentState]['marginTop'] : 0,
        marginBottom : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['marginBottom']) ? item.component.props[renderComponentState]['marginBottom'] : 0,
        marginRight : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['marginRight']) ? item.component.props[renderComponentState]['marginRight'] : 0,
        marginLeft : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['marginLeft']) ? item.component.props[renderComponentState]['marginLeft'] : 0,
        paddingTop : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['paddingTop']) ? item.component.props[renderComponentState]['paddingTop'] : 0,
        paddingBottom : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['paddingBottom']) ? item.component.props[renderComponentState]['paddingBottom'] : 0,
        paddingLeft : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['paddingLeft']) ? item.component.props[renderComponentState]['paddingLeft'] : 0,
        paddingRight : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['paddingRight']) ? item.component.props[renderComponentState]['paddingRight'] : 0,
        boxShadow : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['shadowColor']) ? `${item.component.props[renderComponentState]['shadowOffsetX'] ? item.component.props[renderComponentState]['shadowOffsetX'] : 0}px ${item.component.props[renderComponentState]['shadowOffsetY'] ? item.component.props[renderComponentState]['shadowOffsetY'] : 0}px ${item.component.props[renderComponentState]['shadowBlur'] ? item.component.props[renderComponentState]['shadowBlur'] : 0}px ${item.component.props[renderComponentState]['shadowSpread'] ? item.component.props[renderComponentState]['shadowSpread'] : 0}px rgba(${item.component.props[renderComponentState]['shadowColor'].r},${item.component.props[renderComponentState]['shadowColor'].g},${item.component.props[renderComponentState]['shadowColor'].b},${item.component.props[renderComponentState]['shadowColor'].a})` : 'none',
        borderTopLeftRadius : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['borderTopLeftRadius']) ? `${item.component.props[renderComponentState]['borderTopLeftRadius']}px` : '0px',
        borderTopRightRadius : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['borderTopRightRadius']) ? `${item.component.props[renderComponentState]['borderTopRightRadius']}px` : '0px',
        borderBottomLeftRadius : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['borderBottomLeftRadius']) ? `${item.component.props[renderComponentState]['borderBottomLeftRadius']}px` : '0px',
        borderBottomRightRadius : (item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['borderBottomRightRadius']) ? `${item.component.props[renderComponentState]['borderBottomRightRadius']}px` : '0px',
    }
    if(item.component.props && item.component.props[renderComponentState] && item.component.props[renderComponentState]['borderWidth'] !== null && item.component.props[renderComponentState]['borderWidth'] > 0){
      gridWidgetStyle.border = `${item.component.props[renderComponentState]['borderWidth']}px ${(item.component.props[renderComponentState]['borderType'])? item.component.props[renderComponentState]['borderType'] : 'solid'} rgba(${(!item.component.props[renderComponentState]['borderColor']) ? 0 :item.component.props[renderComponentState]['borderColor'].r},${(!item.component.props[renderComponentState]['borderColor']) ? 0 :item.component.props[renderComponentState]['borderColor'].g},${(!item.component.props[renderComponentState]['borderColor']) ? 0 :item.component.props[renderComponentState]['borderColor'].b},${(!item.component.props[renderComponentState]['borderColor']) ? 1 : item.component.props[renderComponentState]['borderColor'].a}`
    }
    return(
      <div 
          ref={ref}
          style={gridWidgetStyle}
        >
            {renderPatternBackground}
            {renderBackgroundImage}
            {(ref.current) ? renderBackgroundVideo : null}
            {renderOverlayGradient}
            {renderOverlayColor}
            {(layouts !== null && gridWidth !== null && currentBreakPoint !== null) ? (
              <Responsive 
                width={(gridWidth > width) ? width : gridWidth}
                useCSSTransforms={false}
                className={item.component.id} 
                isDraggable={false}
                isResizable={false}
                // isDroppable={(selectedGrid && item.i === selectedGrid.selectedID && item.y === 0)}
                isDroppable={false}
                compactType={null}
                margin={[0,0]}
                rowHeight={10}
                style={{
                    // ...styles.mainGridContainer
                    // height : (deviceAgent.platform.type == "desktop") ?(deviceAgent.os.name == "Windows") ? '78vh' : '100%' : '100%'
                }}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 24, md: 20, sm: 12, xs: 8, xxs: 4}}
                layouts={layouts}
                preventCollision={true}
              >
                {children} 
              </Responsive>
            ) : null}
        </div>
    )
}

const styles = {
    mainContainer : {
        height : '100%',
        overflowY : 'hidden',
        overflowX : 'hidden',
        width : '100%',
        paddingBottom : 10
    },
    mainGridContainer : {
        // backgroundColor : 'rgba(1,1,1,0)',
        // height : '78vh',
        overflowY : 'scroll',
        overflowX : 'hidden',
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
      // backgroundColor : 'rgb(40, 44, 52, 0)',
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'
    }
}

export default GridWidget;