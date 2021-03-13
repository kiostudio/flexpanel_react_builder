import { useEffect , useState , useCallback , useRef } from 'react';
import dynamic from 'next/dynamic'
import { Button , ButtonGroup , Position , Drawer ,  Toaster , Toast , Classes , Spinner ,NonIdealState , Tabs , Tab , FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();
const TopBarDrawer = dynamic(() => import('./topBarDrawer'),{ ssr: false  , loading : ()=><div className={Classes.SKELETON} style={styles.skeletonContainer}></div>});
const PanleTab = dynamic(() => import('./panelTab'),{ ssr: false  , loading : ()=><div className={Classes.SKELETON} style={styles.skeletonContainer}></div>});
const Grid = dynamic(() => import('./grid'),{ ssr: false  , loading : ()=><div className={Classes.SKELETON} style={styles.skeletonContainer}></div>});
const WidgetDrawer = dynamic(() => import('./widgetDrawer'),{ ssr: false });
const PropsDrawer = dynamic(() => import('./propsDrawer'),{ ssr: false });
const ActionsDrawer = dynamic(() => import('./actionsDrawer'),{ ssr: false });
// import TopBarDrawer from './topBarDrawer';
// import PanleTab from './panelTab';
// import Grid from './grid';
// import WidgetDrawer from './widgetDrawer';
// import PropsDrawer from './propsDrawer';
// import ActionsDrawer from './actionsDrawer';
// import { API , Auth } from 'aws-amplify';
// import { getPanel, byUserPriority } from '../../graphql/queries';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Bowser from "bowser";
import { HotKeys } from "react-hotkeys";
import { Transition } from 'react-transition-group';

const keyMap = {
    ESC: "esc",
    MENU: "cmd+m"
};

const duration = 250

const transitionStyles ={
    entering: { width: '0px' },
    entered:  { width: '30%' },
    exiting:  { width: '30%' },
    exited:  { width: '0px' },
}

const sidebarStyle = {
    transition: `width ${duration}ms ease-in-out`
}

// 1. Load Dashbaord
// 2. Check whether it is a login user or not
// 3. If yes, get the first panel and tab -> load it
// 4. If no, check whether there is a panelId ; If yes, check whether it is avaliable for public or not -> Load , vice versa

// const getPanelById = async(panelId,setError,setDisplayPanel,setLoading,setUserRole,setDisplayTab)=>{
//     try {
//         setLoading(true);
//         const panelRes = await API.graphql({
//             query : getPanel,
//             variables: {
//                 id : panelId
//             }
//         });
//         console.log('Get Panel Res',panelRes);
//         // if(panelRes.data.getPanel.tabs.items.length > 0) setTabId(panelRes.data.getPanel.tabs.items[0]['id']);
//         let authData = await Auth.currentUserInfo();
//         // console.log('Auth Data : ',authData);
//         if(panelRes.data.getPanel != null) {
//             // panelRes.data.getPanel.logo = (panelRes.data.getPanel.logo) ? await Storage.get(panelRes.data.getPanel.logo , { level: 'public' }) : null;
//             // panelRes.data.getPanel.favicon = (panelRes.data.getPanel.favicon) ? await Storage.get(panelRes.data.getPanel.favicon , { level: 'public' }) : null;
//             // const favicon = document.getElementById("favicon");
//             // if(panelRes.data.getPanel.favicon){
//             //     favicon.href = panelRes.data.getPanel.favicon;
//             // } else {
//             //     favicon.href = "/favicon.ico";
//             // }
//                 setDisplayPanel(panelRes.data.getPanel);
//                 setDisplayTab(panelRes.data.getPanel.tabs.items);

//             // if(authData != null && panelRes.data.getPanel.userID == authData.username){
//             // } else {
//             //     if(panelRes.data.getPanel.availability == 'public') setDisplayPanel(panelRes.data.getPanel);
//             //     setDisplayTab(panelRes.data.getPanel.tabs.items.filter((tab)=>tab.availability == 'public'));
//             // }
//         }
//         setLoading(false);
//     } catch (error) {
//         console.log('Error :',error);
//         setError(error);
//     }
// }

function MainPanel({ router , tabid , panelid , panel , tab , userRole , authData , subDomainMode , setTitle , rootRoute , logoImage , faviconImage , setFaviconImage , setLogoImage , targetVersion }) {
    // const { history , match , location , domainPanel } = props;
    const handle = useFullScreenHandle();
    // console.log('props',props);
    // const { params } = match;
    const [panelId,setPanelId] = useState((panelid) ? panelid : null);
    const [editPanel,setEditPanel] = useState(null);
    const [tabId,setTabId] = useState((tabid) ? tabid : null);
    const [displayPanel,setDisplayPanel] = useState((panel) ? panel : null);
    const [displayTab,setDisplayTab] = useState((tab) ? tab : null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [info,setInfo] = useState(null);
    // const [userRole,setUserRole] = useState(null);
    const [topDrawer,setTopDrawer] = useState(false);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [userID,setUserID] = useState((authData !== null) ? authData.username : null);
    const [alertOpen,setAlertOpen] = useState(false);
    const [widgetDrawer,setWidgetDrawer] = useState(false);
    const [dragWidget,setDragWidget] = useState(null);
    const [gridSave,setGridSave] = useState(null);
    const [fullScreen,setFullScreen] = useState(false);
    const [selectedGrid,setSelectedGrid] = useState(null);
    // const [authData,setauthData] = useState(null);
    const [deviceAgent,setDeviceAgent] = useState({});
    const [showSideMenuContent,setShowSideMenuContent] = useState(false);
    const [showSideMenu,setShowSideMenu] = useState(false);
    const fullScreenChange = useCallback((state, handle) => {
        // console.log('Full Screen Change ',state,handle);
        setFullScreen(state);
    },[handle]);
    useEffect(()=>setDisplayTab(tab),[tab]);
    const [portViewWidth,setPortViewWidth] = useState(null);
    const protViewRef = useRef(null);
    useEffect(()=>{
        if(protViewRef.current !== null){
          // console.log('Set Grid Width',ref.current)
          // console.log('Width Change : ',ref.current.offsetWidth);
            setPortViewWidth(protViewRef.current.offsetWidth);
            // console.log(protViewRef.current.offsetWidth);
        }
    },[showSideMenu])
    const [selectedTab,setSelectedTab] = useState('newWidget');
    // useEffect(()=>{
    //     const panelIdQuery = new URLSearchParams(location.search).get('id');
    //     console.log('Panel Id Change :',panelIdQuery);
    //     if(panelIdQuery != null) {
    //         setTopDrawer(false);
    //         setPanelId(new URLSearchParams(location.search).get('id'))
    //         setDisplayTab(null);
    //         setTabId(null);
    //     } else if (panelIdQuery === null){
    //         loadFirstPanel(history,setDisplayPanel,setLoading);
    //     }
    // },[new URLSearchParams(location.search).get('id')]);
    // useEffect(()=>{
    //     checkUserRole(setUserRole,setUserID,setLoading,setauthData);
    // },[]);
    // useEffect(()=>{
    //     console.log('Url Panel Id :',panelId);
    //     if(panelId) getPanelById(panelId,setError,setDisplayPanel,setLoading,setUserRole,setDisplayTab)
    // },[panelId,userRole])
    useEffect(()=>{
        const deviceParam = Bowser.parse(window.navigator.userAgent);
        // console.log(deviceParam);
        setDeviceAgent(deviceParam);
    },[]);
    const selectedGridID = (selectedGrid && selectedGrid.selectedID) ? selectedGrid.selectedID : null;
    useEffect(()=>{
        // if (selectedGrid !== null) setShowSideMenu(true);
        setSelectedTab((selectedGridID !== null)  ? 'styleSetting' : 'newWidget')
    },[selectedGridID])
    useEffect(()=>{
        setTabId(tabid);
    },[tabid])
    return(   
        <FullScreen handle={handle} onChange={fullScreenChange}>
            <HotKeys 
                keyMap={keyMap}
                handlers={{
                    ESC: event => {
                        if(showSideMenu === false) setSelectedGrid(null);
                        // setShowSideMenu(false);
                    },
                    MENU: event => setShowSideMenu((originState)=>!originState)
                }}
            >
                <div style={{ display : 'flex' , flex : 1 , flexDirection : 'row' , alignSelf : 'stretch'  }}>                            
                    <div style={{
                        ...styles.mainContainer,
                        // width : (showPropsMenu === true) ? '70%' : '100%'
                        width : '100%'
                    }}>
                    <Toaster position={Position.TOP}>
                        {(error != null) ? <Toast intent={'danger'} message={error.message} onDismiss={()=>setError(null)} timeout={(error.timeout) ? error.timeout : 5000} /> : null}
                        {(info != null) ? <Toast intent={'primary'} message={info} onDismiss={()=>setInfo(null)} /> : null}
                    </Toaster>
                    <Drawer
                        isOpen={topDrawer}
                        position={Position.TOP}
                        canEscapeKeyClose={(dialogOpen == false && alertOpen == false)}
                        canOutsideClickClose={true}
                        onClose={()=>setTopDrawer(false)}
                        style={{ backgroundColor : '#30404D' , height : 220  }}
                    >
                        {(topDrawer == true && userRole != 'guest') ? 
                            <TopBarDrawer 
                                setDisplayPanel={setDisplayPanel} 
                                router={router} 
                                dialogOpen={dialogOpen} 
                                setDialogOpen={setDialogOpen} 
                                userID={userID} 
                                alertOpen={alertOpen} 
                                setAlertOpen={setAlertOpen} 
                                setError={setError} 
                                panelId={panelId} 
                                setPanelId={setPanelId} 
                                editPanel={editPanel} 
                                setEditPanel={setEditPanel} 
                                authData={authData} 
                                setInfo={setInfo}
                                setTabId={setTabId}
                                setTopDrawer={setTopDrawer}
                                setDisplayTab={setDisplayTab}
                                setTitle={setTitle}
                                setFaviconImage={setFaviconImage}
                                setLogoImage={setLogoImage}
                                logoImage={logoImage}
                                faviconImage={faviconImage}
                            /> : null}
                    </Drawer>
                    {(userRole !== 'guest') ? <div style={styles.topBar}>
                        {(logoImage !== null) ? <a href='/' style={styles.logoContainer}>
                            <img alt={'logo'} style={{ 
                                ...styles.logo , 
                                width : (logoImage !== 'default') ? 200 : 30,
                                height : (logoImage !== 'default') ? 50 : 30,
                                objectFit : (logoImage !== 'default') ? 'contain' : null,
                                objectPosition : (logoImage !== 'default') ? 'left' : 'center',
                                borderRadius :(logoImage !== 'default') ? 0 : 5
                            }} src={(logoImage !== 'default') ? logoImage : '/logo.png'}/>
                            {(logoImage !== 'default') ? null  : <h1 style={styles.brandName}>Flexpanel</h1>}
                        </a> : <div className={Classes.SKELETON} style={styles.logoLoader}></div>}
                        {(userRole == null) ? <Spinner size='20'/> : (userRole == 'owner' || userRole == 'logedin') ? <ButtonGroup>
                            {(fullScreen == false) ? <Button icon="settings"
                                onClick={()=>{
                                    setEditPanel(displayPanel)
                                    setTopDrawer(true);
                                    setTimeout(()=>setDialogOpen(true),500);
                                }}
                            ></Button> :null}
                            <Button icon={(fullScreen == false) ? "fullscreen" : "minimize"} onClick={(fullScreen == false) ? handle.enter : handle.exit}></Button>
                            {(fullScreen == false) ? <Button 
                                icon={(topDrawer) ? "chevron-up" : "chevron-down"}
                                onClick={()=>{
                                    setTopDrawer(true);
                                }}
                            ></Button> : null}
                        </ButtonGroup> : null}
                    </div> : null}
                    {(subDomainMode !== true) ? <PanleTab 
                        subDomainMode={subDomainMode} 
                        displayTab={displayTab} 
                        setDisplayTab={setDisplayTab} 
                        panelId={panelId} 
                        tabId={tabId} 
                        setTabId={setTabId} 
                        userRole={userRole} 
                        gridSave={gridSave} 
                        setError={setError} 
                        router={router}
                        reload={()=>getPanelById(panelId,setError,setDisplayPanel,setLoading,null,setDisplayTab)}
                        setTitle={setTitle}
                        panelName={displayPanel.name}
                        rootRoute={rootRoute}
                        userID={userID}
                        versionID={(targetVersion !== null && targetVersion.id) ? targetVersion.id : null}
                    /> : null}
                    {(userRole == 'guest' && fullScreen === false) ?
                        <Button large={true} onClick={()=>{}} style={{ position : 'absolute' , zIndex : 10 , bottom : 20 , right : 20 , fontWeight : 'bold' , borderRadius : 20 }}>
                            <a href='/' style={styles.logoContainer}>
                                <img alt={'logo'} style={{ 
                                    ...styles.logo,
                                    width : 20,
                                    height : 20,
                                    marginRight : 5
                                }} src={'/logo.png'}/>
                                {"Made in Flexpanel"}
                            </a>
                        </Button> 
                        : null}
                    {
                        (loading == false) ?
                            (displayPanel != null) ? 
                                <div
                                    ref={protViewRef}
                                    style={{
                                        ...styles.gridPortView,
                                        width : '100%',
                                        padding : (userRole == 'owner')  ? '5px 10px' : 0,
                                        borderTop: (userRole !== 'guest') ? '1px solid #272C33' : 'none',
                                        backgroundColor : (displayTab && tabId && displayTab.filter((tab)=>tab.id == tabId).length === 1 && displayTab.filter((tab)=>tab.id == tabId)[0]['backgroundColor']) ? `rgba(${displayTab.filter((tab)=>tab.id == tabId)[0]['backgroundColor'].r},${displayTab.filter((tab)=>tab.id == tabId)[0]['backgroundColor'].g},${displayTab.filter((tab)=>tab.id == tabId)[0]['backgroundColor'].b},${displayTab.filter((tab)=>tab.id == tabId)[0]['backgroundColor'].a})`  : '#E4E4E4',
                                        display : (showSideMenu === true && 1250 > portViewWidth) ? '' : 'flex',
                                        justifyContent : (showSideMenu === true && 1250 > portViewWidth) ? '' : 'center'
                                    }}
                                >
                                    <Grid 
                                        subDomainMode={subDomainMode} 
                                        displayTab={displayTab}
                                        setTitle={setTitle}
                                        panelName={displayPanel.name}
                                        router={router}
                                        rootRoute={rootRoute}
                                        setTabId={setTabId} 
                                        setShowSideMenu={setShowSideMenu} 
                                        selectedGrid={selectedGrid} 
                                        setSelectedGrid={setSelectedGrid} 
                                        deviceAgent={deviceAgent} 
                                        panelId={panelId} 
                                        tabId={tabId} 
                                        dragWidget={dragWidget} 
                                        setDragWidget={setDragWidget} 
                                        userRole={userRole} 
                                        userID={userID} 
                                        setGridSave={setGridSave} 
                                        setError={setError}
                                    /> 
                                </div> : 
                                <NonIdealState 
                                    // title={'Sorry we cannot find any panel'}
                                    children={
                                        <div style={styles.noIdealContainer}>
                                            <h2>{(userRole === 'guest') ? 'Sorry we cannot find the panel' : 'Create Your First Panel Now'}</h2>
                                            {(userRole == 'guest') ? 
                                                <Button large={true} intent={'primary'} text="Log In" style={styles.noIdealActionButton} onClick={()=>history.push('/login')}/> : 
                                                <Button large={true} intent={'primary'} icon={'plus'} text="Create New Panel" style={styles.noIdealActionButton} onClick={()=>{
                                                    setTopDrawer(true);
                                                    setTimeout(()=>setDialogOpen(true),500);
                                                }}/>}
                                        </div>
                                    }
                                /> : null
                                // <div className={Classes.SKELETON} style={styles.skeletonContainer}></div>
                    }
                    </div>
                    <Transition in={showSideMenu} timeout={duration} onExited={()=>setShowSideMenuContent(false)} onEnter={()=>setShowSideMenuContent(true)}>
                        {state => (
                            <div 
                                className="sidebar"
                                style={
                                { 
                                    ...sidebarStyle,
                                    ...transitionStyles[state],
                                    borderLeft: (userRole == 'owner') ? '1px solid #3C4043' : '0px', 
                                    // backgroundColor : 'red',
                                    // display : 'flex'
                                    // width : (showPropsMenu === true) ? '30%' : '0%'
                                }}>
                                    {(userRole == 'owner') ? <div style={{
                                        ...styles.propsMenuTriggerWrapper,
                                        right :  '0%'
                                    }}>
                                        <Button
                                            minimal={true}
                                            style={{ height : '100%' }}
                                            icon={(showSideMenu === true) ? 'chevron-right' : 'chevron-left'}
                                            onClick={()=>setShowSideMenu(!showSideMenu)}
                                        />
                                    </div> : null}
                                    <div style={{ display : (showSideMenuContent === true) ? '' : 'none' , backgroundColor : '#272C33' , height : '100vh' , position : 'absolute' , top : 0 , width : '23%' , padding : '10px 0px' }}>
                                        <Tabs id="sideMenu" 
                                            onChange={(selectedTabId)=>setSelectedTab(selectedTabId)} 
                                            selectedTabId={selectedTab} 
                                            renderActiveTabPanelOnly={true}
                                        >
                                            <Tab 
                                                id="newWidget" 
                                                title="New" 
                                                style={(selectedTab === "newWidget") ? {
                                                    ...styles.tabSelected ,
                                                    marginLeft : 10
                                                } :  { 
                                                    ...styles.tabIdle,
                                                    marginLeft : 10
                                                } }
                                                panel={<WidgetDrawer widgetDrawer={widgetDrawer} setWidgetDrawer={setWidgetDrawer} setDragWidget={setDragWidget}/>} 
                                            />
                                            <Tab 
                                                id="styleSetting" 
                                                title="Style" 
                                                style={(selectedTab === "styleSetting") ? styles.tabSelected : styles.tabIdle} 
                                                panel={<PropsDrawer selectedGrid={selectedGrid} setSelectedGrid={setSelectedGrid} setGridSave={setGridSave}/>} 
                                            />
                                            <Tab 
                                                id="actionsSetting" 
                                                title="Actions" 
                                                style={(selectedTab === "actionsSetting") ? styles.tabSelected : styles.tabIdle} 
                                                panel={<ActionsDrawer selectedGrid={selectedGrid} setSelectedGrid={setSelectedGrid} setGridSave={setGridSave} displayTab={displayTab}/>} 
                                            />
                                            <Tab 
                                                id="layersSetting" 
                                                title="Layers" 
                                                style={(selectedTab === "layersSetting") ? styles.tabSelected : styles.tabIdle} 
                                                panel={<span>{'Layers Menu'}</span>} 
                                            />
                                        </Tabs>
                                    </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </HotKeys>
        </FullScreen> 
    )
}

const styles = {
    mainContainer : {
        backgroundColor : '#30404D' , 
        display : 'flex' , 
        flexDirection : 'column' , 
        height : '100vh' , 
        alignItems : 'center' , 
        justifyContent : 'flex-start',
        overflow : 'hidden'
        // padding : 5
    },
    topBar : {
        display : 'flex',
        alignSelf : 'stretch',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : '#30404D',
        padding : '10px 10px'
    },
    logoContainer : {
        display : 'flex',
        alignSelf : 'stretch',
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 5
    },
    logo : {
        width : '2em'
    },
    logoLoader : {
        width : 200,
        height : 50
    },
    brandName : {
        fontFamily : 'Modia',
        color : '#FFFFFF',
        fontSize : '1em',
        marginLeft : 15
    },
    gridContainer : {
        display : 'flex',
        backgroundColor : 'red'
    },
    skeletonContainer : {
        display : 'flex',
        flex : 1,
        alignSelf : 'stretch',
        margin : 20,
        padding : 10
    },
    noIdealContainer : {
        color : '#FFFFFF'
    },
    noIdealActionButton : {
        fontWeight : 'bold'
    },
    gridPortView : {
        height : '100vh' , 
        overflow : 'hidden'
    },
    propsMenuTriggerWrapper : { 
        backgroundColor : '#252729' , 
        position : 'relative' , 
        display : 'flex', 
        alignItems : 'center', 
        height : 80 , 
        width : 30 , 
        top : '45%',
        left : '-30px',
        zIndex : 10,
        borderRadius : '5px 0px 0px 5px'
    },
    tabSelected : {
        color : 'rgb(50, 163, 252)',
        fontWeight : 'bold'
    },
    tabIdle : {
        color : '#FFFFFF'
    }
}
  
export default MainPanel;