import { useEffect , useState , useMemo } from 'react';

function ButtonWidget({itemProps,itemActions,item,setTabId,displayTab,subDomainMode,router,panelName,rootRoute,setTitle,tabList}){
    const [buttonTxt,setButtonTxt] = useState((itemProps && itemProps[buttonState] && itemProps[buttonState]['textContent']) ? itemProps[buttonState]['textContent'] : 'Button');
    const [buttonState,setButtonState] = useState('default');
    const [props,setSelectProps] = useState((itemProps && itemProps[buttonState]) ? itemProps[buttonState] : {});
    const [buttonStyle,setButtonStyle] = useState({
        backgroundColor : (itemProps['default'] && itemProps['default']['buttonColor']) ? `rgba(${itemProps['default']['buttonColor'].r},${itemProps['default'] ['buttonColor'].g},${itemProps['default'] ['buttonColor'].b},${itemProps['default'] ['buttonColor'].a})` : '#e7e7e7',
        color : (itemProps['default']  && itemProps['default']['fontColor']) ? `rgba(${itemProps['default'] ['fontColor'].r},${itemProps['default'] ['fontColor'].g},${itemProps['default'] ['fontColor'].b},${itemProps['default'] ['fontColor'].a})` : '#000000',
        fontFamily : (itemProps['default']  && itemProps['default']['fontFamily']) ? itemProps['default'] ['fontFamily'] : 'Arial',
        fontSize : (itemProps['default']  && itemProps['default'] ['fontSize']) ? itemProps['default'] ['fontSize'] : 14,
        fontWeight : (itemProps['default']  && itemProps['default']['fontWeight']) ? itemProps['default'] ['fontWeight'] : 100,
        fontStyle : (itemProps['default']  && itemProps['default']['fontStyle']) ? itemProps['default'] ['fontStyle'] : 'normal',
        textDecoration : (itemProps['default'] && itemProps['default']['textDecoration']) ? itemProps['default'] ['textDecoration'] : 'none',
        borderTopLeftRadius : ( itemProps['default']  && itemProps['default']['borderTopLeftRadius']) ? `${itemProps['default']['borderTopLeftRadius']}px` : '5px',
        borderTopRightRadius : ( itemProps['default']  && itemProps['default']['borderTopRightRadius']) ? `${itemProps['default']['borderTopRightRadius']}px` : '5px',
        borderBottomLeftRadius : ( itemProps['default']  && itemProps['default']['borderBottomLeftRadius']) ? `${itemProps['default']['borderBottomLeftRadius']}px` : '5px',
        borderBottomRightRadius : (itemProps['default']  && itemProps['default']['borderBottomRightRadius']) ? `${itemProps['default']['borderBottomRightRadius']}px` : '5px',
        paddingTop : ( itemProps['default']  &&  itemProps['default']['paddingTop']) ?  itemProps['default'] ['paddingTop'] : 'none',
        paddingBottom : ( itemProps['default']  &&  itemProps['default']['paddingBottom']) ?  itemProps['default'] ['paddingBottom'] : 'none',
        paddingLeft: ( itemProps['default']  &&  itemProps['default']['paddingLeft']) ?  itemProps['default'] ['paddingLeft'] : 'none',
        paddingRight : (  itemProps['default']  &&  itemProps['default']['paddingRight']) ?  itemProps['default'] ['paddingRight'] : 'none',
        border : (itemProps && itemProps['default'] &&  itemProps['default']['borderWidth'] &&  itemProps['default']['borderWidth'] > 0) ? `${ itemProps['default']['borderWidth']}px ${( itemProps['default']['borderType'])?  itemProps['default']['borderType'] : 'solid'} rgba(${(! itemProps['default']['borderColor']) ? 0 : itemProps['default']['borderColor'].r},${(! itemProps['default']['borderColor']) ? 0 : itemProps['default']['borderColor'].g},${(! itemProps['default']['borderColor']) ? 0 : itemProps['default']['borderColor'].b},${(! itemProps['default']['borderColor']) ? 1 :  itemProps['default']['borderColor'].a}` : 0,
        opacity : (itemProps && itemProps['initiation'] && itemProps['initiation']['opacity'] !== null) ? itemProps['initiation']['opacity'] : 1,
        marginTop : (itemProps && itemProps['initiation'] && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] === 'bottom') ? 100 : 'none',
        marginBottom : (itemProps && itemProps['initiation'] && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] === 'top') ? 100 : 'none',
        marginLeft : (itemProps && itemProps['initiation'] && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] === 'right') ? 100 : 'none',
        marginRight : (itemProps && itemProps['initiation'] && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] === 'left') ? 100 : 'none'
    });
    const [linkAction,setLinkAction] = useState(null);
    const [init,setInit] = useState((itemProps && itemProps['initiation']) ? false : true);
    useEffect(()=>{
        setButtonTxt((itemProps && itemProps[buttonState] && itemProps[buttonState]['textContent']) ? itemProps[buttonState]['textContent'] : 'Button');
        setSelectProps((itemProps && itemProps[buttonState]) ? itemProps[buttonState] : {});
    },[JSON.stringify(itemProps)]);
    useEffect(()=>{ 
        if(itemProps && itemProps['initiation'] && itemProps['initiation']['transitionDuration']) setTimeout(()=>setInit(true),itemProps['initiation']['transitionDuration']*1000);
    },[])
    useEffect(()=>{
        let buttonStyle = {
            transitionDuration : (init === true) ? (itemProps[buttonState] && itemProps[buttonState]['transitionDuration']) ? `${itemProps[buttonState]['transitionDuration']}s` : '0s' : `${(itemProps && itemProps['initiation'] && itemProps['initiation']['transitionDuration']) ? itemProps['initiation']['transitionDuration']+'s' : '0.5s'}`,
            transitionTimingFunction : ' ease-in-out',
            backgroundColor : (props && props['buttonColor']) ? `rgba(${props['buttonColor'].r},${props['buttonColor'].g},${props['buttonColor'].b},${props['buttonColor'].a})` : (itemProps['default']  && itemProps['default']['buttonColor']) ? `rgba(${itemProps['default'] ['buttonColor'].r},${itemProps['default'] ['buttonColor'].g},${itemProps['default'] ['buttonColor'].b},${itemProps['default'] ['buttonColor'].a})` : 'rgb(239, 239, 239)',
            color : (props && props['fontColor']) ? `rgba(${props['fontColor'].r},${props['fontColor'].g},${props['fontColor'].b},${props['fontColor'].a})` : '#000000',
            fontFamily : (props && props['fontFamily']) ? props['fontFamily'] : 'Arial',
            fontSize : (props && props['fontSize']) ? props['fontSize'] : 14,
            fontWeight : (props && props['fontWeight']) ? props['fontWeight'] : 100,
            fontStyle : (props && props['fontStyle']) ? props['fontStyle'] : 'normal',
            textDecoration : (props && props['textDecoration']) ? props['textDecoration'] : 'none',
            borderTopLeftRadius : ( props && props['borderTopLeftRadius'] !== null) ? `${props['borderTopLeftRadius']}px` : 'none',
            borderTopRightRadius : ( props &&  props['borderTopRightRadius']!== null) ? `${props['borderTopRightRadius']}px` : 'none',
            borderBottomLeftRadius : ( props && props['borderBottomLeftRadius']!== null) ? `${props['borderBottomLeftRadius']}px` : 'none',
            borderBottomRightRadius : (props && props['borderBottomRightRadius']!== null) ? `${props['borderBottomRightRadius']}px` : 'none',
            marginTop : ( props &&  props['marginTop']) ?  props['marginTop'] : 0,
            marginBottom : ( props &&  props['marginBottom']) ?  props['marginBottom'] : 0,
            marginRight : ( props &&  props['marginRight']) ?  props['marginRight'] : 0,
            marginLeft : ( props &&  props['marginLeft']) ?  props['marginLeft'] : 0,
            paddingTop : ( props &&  props['paddingTop']) ?  props['paddingTop'] : 'none',
            paddingBottom : ( props &&  props['paddingBottom']) ?  props['paddingBottom'] : 'none',
            paddingLeft: ( props &&  props['paddingLeft']) ?  props['paddingLeft'] : 'none',
            paddingRight : (  props &&  props['paddingRight']) ?  props['paddingRight'] : 'none',
            cursor : (linkAction && (linkAction.url || linkAction.urlTab)) ? 'pointer' : ( props &&  props['cursor']) ?  props['cursor'] : 'default',
            opacity : ( props && props['opacity']) ? props['opacity'] : 1
            // if(item.component  props['shadowColor']) headerStyle.textShadow = `${item.component  props['shadowOffsetX'] ? item.component  props['shadowOffsetX'] : 0}px ${item.component  props['shadowOffsetY'] ? item.component  props['shadowOffsetY'] : 0}px ${item.component  props['shadowBlur'] ? item.component  props['shadowBlur'] : 0}px rgba(${item.component  props['shadowColor'].r},${item.component  props['shadowColor'].g},${item.component  props['shadowColor'].b},${item.component.props['shadowColor'].a})`;
        };
        if( props &&  props['borderWidth'] &&  props['borderWidth'] > 0) buttonStyle.border = `${ props['borderWidth']}px ${( props['borderType'])?  props['borderType'] : 'solid'} rgba(${(! props['borderColor']) ? 0 : props['borderColor'].r},${(! props['borderColor']) ? 0 : props['borderColor'].g},${(! props['borderColor']) ? 0 : props['borderColor'].b},${(! props['borderColor']) ? 1 :  props['borderColor'].a}`;
        if(buttonState !== 'default'){
            // console.log(buttonState);
            buttonStyle = {
                ...buttonStyle,
                backgroundColor : (itemProps[buttonState] && itemProps[buttonState]['buttonColor']) ? `rgba(${itemProps[buttonState]['buttonColor'].r},${itemProps[buttonState]['buttonColor'].g},${itemProps[buttonState]['buttonColor'].b},${itemProps[buttonState]['buttonColor'].a})` : 'none',
                transitionDuration : (itemProps[buttonState] && itemProps[buttonState]['transitionDuration']) ? `${itemProps[buttonState]['transitionDuration']}s` : '0s',
                paddingTop : ( itemProps[buttonState] &&  itemProps[buttonState]['paddingTop']) ?  itemProps[buttonState]['paddingTop'] : 'none',
                paddingBottom : ( itemProps[buttonState] &&  itemProps[buttonState]['paddingBottom']) ?  itemProps[buttonState]['paddingBottom'] : 'none',
                paddingLeft: ( itemProps[buttonState] &&  itemProps[buttonState]['paddingLeft']) ?  itemProps[buttonState]['paddingLeft'] : 'none',
                paddingRight : (  itemProps[buttonState] &&  itemProps[buttonState]['paddingRight']) ?  itemProps[buttonState]['paddingRight'] : 'none',
                fontSize : (itemProps[buttonState]  && itemProps[buttonState]['fontSize']) ? itemProps[buttonState]['fontSize'] : (itemProps['default']  && itemProps['default'] ['fontSize']) ? itemProps['default'] ['fontSize'] : 14 ,
                color : (itemProps[buttonState] && itemProps[buttonState]['fontColor']) ? `rgba(${itemProps[buttonState]['fontColor'].r},${itemProps[buttonState]['fontColor'].g},${itemProps[buttonState]['fontColor'].b},${itemProps[buttonState]['fontColor'].a})` : (itemProps['default']  && itemProps['default']['fontColor']) ? `rgba(${itemProps['default'] ['fontColor'].r},${itemProps['default'] ['fontColor'].g},${itemProps['default'] ['fontColor'].b},${itemProps['default'] ['fontColor'].a})` : '#000000',
                opacity : ( itemProps[buttonState] &&  itemProps[buttonState]['opacity']) ?  itemProps[buttonState]['opacity'] : 1,
                textDecoration : (itemProps[buttonState] && itemProps[buttonState]['textDecoration']) ? itemProps[buttonState]['textDecoration'] : 'none',
            }
            if( itemProps[buttonState] &&  itemProps[buttonState]['borderWidth'] &&  itemProps[buttonState]['borderWidth'] > 0) buttonStyle.border = `${itemProps[buttonState]['borderWidth']}px ${(itemProps[buttonState]['borderType'])?  props['borderType'] : 'solid'} rgba(${(!itemProps[buttonState]['borderColor']) ? 0 : itemProps[buttonState]['borderColor'].r},${(!itemProps[buttonState]['borderColor']) ? 0 : itemProps[buttonState]['borderColor'].g},${(!itemProps[buttonState]['borderColor']) ? 0 : itemProps[buttonState]['borderColor'].b},${(!itemProps[buttonState]['borderColor']) ? 1 :  itemProps[buttonState]['borderColor'].a}`;
            // console.log(buttonStyle)
        }
        setButtonStyle(buttonStyle)
    },[JSON.stringify(props),buttonState,linkAction,init])
    useEffect(()=>{
        if(itemActions['onMouseDown']){
            if(itemActions['onMouseDown']['link'] ){
                let url;
                let newWindow = (itemActions['onMouseDown']['link']['newWindow'] && itemActions['onMouseDown']['link']['newWindow'] == true);
                let urlTab;
                if(itemActions['onMouseDown']['link']['source']){
                    if(itemActions['onMouseDown']['link']['source']['url']){
                        url = itemActions['onMouseDown']['link']['source']['url'];
                    }
                    if(itemActions['onMouseDown']['link']['source']['tabId']){
                        console.log('Url Action',itemActions['onMouseDown']['link']['source']['tabId']);
                        url = itemActions['onMouseDown']['link']['source']['tabId'];
                        const targetTab = tabList.filter((tab)=>tab.id == itemActions['onMouseDown']['link']['source']['tabId']);
                        if(targetTab.length == 1){
                            const value = targetTab[0];
                            urlTab = value;
                            if(value.route !== null){
                                if(value.route === ""){
                                    url = (rootRoute == "/") ?  '/': '/home';
                                } else {
                                    url = '/'+value.route;
                                }
                            } else {
                                url = '/'+value.id;
                            }
                        }
                    }
                }
                setLinkAction({ url : url , newWindow : newWindow , urlTab : urlTab });
            }
        }
    },[JSON.stringify(itemActions)])
    return (
        <div 
            style={{
                ...styles.mainContainer,
                alignItems : (props && props['horizontalAlignment']) ? props['horizontalAlignment'] : 'center',
                justifyContent : (props && props['verticalAlignment']) ? props['verticalAlignment'] : 'center',
                backgroundColor : (props && props['backgroundColor']) ? `rgba(${props['backgroundColor'].r},${props['backgroundColor'].g},${props['backgroundColor'].b},${props['backgroundColor'].a})` : 'transparent'
            }}
        >
            <a href={(linkAction && linkAction.url) ? linkAction.url : null}></a>
            <button
                onMouseEnter={()=>(init === true) ? setButtonState('hover') : null}
                onMouseLeave={()=>(init === true) ? setButtonState('default') : null}
                onMouseDown={()=>setButtonState('click')}
                onMouseUp={()=>setButtonState('default')}
                onClick={()=>{
                    if(linkAction && linkAction.url){
                        console.log(linkAction.newWindow,linkAction['url']);
                        if (linkAction.newWindow == true) {
                            window.open(linkAction['url']);
                        } else{
                            // router.push('/',linkAction['url']);
                            window.location.href = linkAction['url'];
                        }
                        // if (linkAction.newWindow == false) router.push(linkAction['url']);
                    //     console.log('LinkAction',linkAction);
                        // if(linkAction.urlTab){
                    //         console.log('Tab Change')
                    //         if (linkAction.newWindow == true){
                    //             window.open(linkAction['url'])
                    //         } else {
                    //             setTabId(linkAction.urlTab.id);
                    //             router.push(rootRoute, linkAction['url'] ,{ shallow : true });
                    //             setTitle(`${(linkAction.urlTab.name) ? linkAction.urlTab.name : 'Flexpanel'} | ${panelName}`)
                    //         }
                        // } else {
                    //         console.log('Url Change');
                    //         if (linkAction.newWindow == true) window.open(linkAction['url']);
                    //         if (linkAction.newWindow == false) window.location.href = linkAction['url'];
                        // }
                    }
                }}
                style={buttonStyle}
            >
                {buttonTxt}
            </button>
        </div>
    );
}

const styles = {
    mainContainer : {
        display : 'flex',
        flex : 1,
        alignSelf : 'stretch',
        flexDirection : 'column',
        overflowY : 'hidden',
        overflowX : 'scroll'
    }
}

export default ButtonWidget;