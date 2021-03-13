import { useEffect , useState , useMemo } from 'react';
// import { Spinner } from "@blueprintjs/core";
// import { API , Storage } from 'aws-amplify';

// const getImage = async(imageProps,setImageSrc)=>{
//     if(imageProps['key'] && !imageProps['key'].includes('https://')){
//         console.log('Image : ',imageProps['image']);
//         const url = await Storage.get(imageProps['key'] , { level: 'public' });
//         setImageSrc(url);
//     } else {
//         setImageSrc(imageProps);
//     }
// }

function ImageWidget({itemProps,itemActions,router,item}){
    const [imageSrc,setImageSrc] = useState(null);
    // const [imageSrc,setImageSrc] = useState((itemProps && itemProps[imgState] && itemProps[imgState]['textContent']) ? itemProps[imgState]['textContent'] : null);
    const [imgState,setImgState] = useState((itemProps && itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0) ? 'initiation' : 'default');
    // const [props,setSelectProps] = useState((itemProps && itemProps[imgState]) ? itemProps[imgState] : {});
    const [imgStyle,setImgStyle] = useState({
        width : '100%' , 
        height : '100%' , 
        opacity : (itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0) ? itemProps['initiation']['opacity'] : (itemProps['default'] &&  itemProps['default']['opacity']) ?  itemProps['default']['opacity'] : 1,
        // opacity : 0.1,
        filter: `grayscale(${(itemProps['default'] && itemProps['default']['greyScale']) ? itemProps['default']['greyScale']+'%' : '0%' })`,
        objectFit : (itemProps['default'] && itemProps['default']['objectFit']) ? itemProps['default']['objectFit'] : 'contain',
        border : (itemProps['default'] && itemProps['default']['borderWidth'] && itemProps['default']['borderWidth'] > 0) ? `${itemProps['default']['borderWidth']}px ${(itemProps['default']['borderType'])? itemProps['default']['borderType'] : 'solid'} rgba(${(!itemProps['default']['borderColor']) ? 0 : itemProps['default']['borderColor'].r},${(!itemProps['default']['borderColor']) ? 0 : itemProps['default']['borderColor'].g},${(!itemProps['default']['borderColor']) ? 0 :  itemProps['default']['borderColor'].b},${(!itemProps['default']['borderColor']) ? 1 : itemProps['default']['borderColor'].a}` : "none",
        borderTopLeftRadius : (itemProps['default'] && itemProps['default']['borderTopLeftRadius']) ? `${ itemProps['default']['borderTopLeftRadius']}px` : '0px',
        borderTopRightRadius : (itemProps['default'] && itemProps['default']['borderTopRightRadius']) ? `${ itemProps['default']['borderTopRightRadius']}px` : '0px',
        borderBottomLeftRadius : (itemProps['default'] && itemProps['default']['borderBottomLeftRadius']) ? `${ itemProps['default']['borderBottomLeftRadius']}px` : '0px',
        borderBottomRightRadius : (itemProps['default'] && itemProps['default']['borderBottomRightRadius']) ? `${ itemProps['default']['borderBottomRightRadius']}px` : '0px',
        boxShadow : (itemProps['default'] && itemProps['default']['shadowColor']) ? `${ itemProps['default']['shadowOffsetX'] ?  itemProps['default']['shadowOffsetX'] : 0}px ${ itemProps['default']['shadowOffsetY'] ?  itemProps['default']['shadowOffsetY'] : 0}px ${ itemProps['default']['shadowBlur'] ?  itemProps['default']['shadowBlur'] : 0}px ${ itemProps['default']['shadowSpread'] ?  itemProps['default']['shadowSpread'] : 0}px rgba(${ itemProps['default']['shadowColor'].r},${ itemProps['default']['shadowColor'].g},${ itemProps['default']['shadowColor'].b},${ itemProps['default']['shadowColor'].a})` : 'none',
        marginTop : (itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0 && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] == 'bottom') ? '50%' : ( itemProps[imgState] &&  itemProps[imgState]['marginTop']) ?  itemProps[imgState]['marginTop'] : 0,
        marginLeft : (itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0 && itemProps['initiation']['direction'] && itemProps['initiation']['direction'] == 'right') ? '50%' : ( itemProps[imgState] &&  itemProps[imgState]['marginBottom']) ?  itemProps[imgState]['marginBottom'] : 0,
        // position : 'fixed',
        // right : 0
    });
    const [linkAction,setLinkAction] = useState(null);
    const [init,setInit] = useState((itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0)? false : true);
    // useEffect(()=>{
    //     setSelectProps((itemProps && itemProps[imgState]) ? itemProps[imgState] : {});
    // },[JSON.stringify(itemProps)]);
    useEffect(()=>{ 
        // console.log('Image Items Props',itemProps);
        // console.log('Item Props',itemProps,itemProps['initiation']);
        // if(itemProps && itemProps['initiation']) setTimeout(()=>setInit(true),(itemProps['initiation']['transitionDuration']) ? itemProps['initiation']['transitionDuration']*1000 : 2000);
        if(itemProps['initiation'] && itemProps['initiation']['transitionDuration'] > 0){
            setTimeout(()=>{
                setImgStyle((originStyle)=>{
                    return {
                        ...originStyle,
                        transitionDuration : `${itemProps['initiation']['transitionDuration']}s`,
                        opacity : itemProps['default']['opacity'],
                        marginTop : ( itemProps['default'] &&  itemProps['default']['marginTop']) ?  itemProps['default']['marginTop'] : 0,
                        marginLeft : ( itemProps['default'] &&  itemProps['default']['marginLeft']) ?  itemProps['default']['marginLeft'] : 0
                    }
                });
                setImgState('default');
                setInit(true);
            },1000)
        }
    },[])
    useEffect(()=>{
            // let imgStyle = {
            //     width : 'auto' , 
            //     height : '100%' , 
            //     transitionDuration : '1s',
            //     opacity : 1
            //     // filter: `grayscale(${(itemProps[imgState] && itemProps[imgState]['greyScale']) ? itemProps[imgState]['greyScale']+'%' : '0%' })`,
            //     // objectFit : (itemProps['default'] && itemProps['default']['objectFit']) ? itemProps['default']['objectFit'] : 'contain',
            //     // opacity : (itemProps[imgState] &&  itemProps[imgState]['opacity']) ?  itemProps[imgState]['opacity'] : 1,
            //     // opacity : 1,
            //     // border : (itemProps[imgState] && itemProps[imgState]['borderWidth'] && itemProps[imgState]['borderWidth'] > 0) ? `${itemProps[imgState]['borderWidth']}px ${(itemProps[imgState]['borderType'])? itemProps[imgState]['borderType'] : 'solid'} rgba(${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].r},${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].g},${(!itemProps[imgState]['borderColor']) ? 0 :  itemProps[imgState]['borderColor'].b},${(!itemProps[imgState]['borderColor']) ? 1 : itemProps[imgState]['borderColor'].a}` : "none",
            //     // borderTopLeftRadius : (itemProps[imgState] && itemProps[imgState]['borderTopLeftRadius']) ? `${ itemProps[imgState]['borderTopLeftRadius']}px` : '0px',
            //     // borderTopRightRadius : (itemProps[imgState] && itemProps[imgState]['borderTopRightRadius']) ? `${ itemProps[imgState]['borderTopRightRadius']}px` : '0px',
            //     // borderBottomLeftRadius : (itemProps[imgState] && itemProps[imgState]['borderBottomLeftRadius']) ? `${ itemProps[imgState]['borderBottomLeftRadius']}px` : '0px',
            //     // borderBottomRightRadius : (itemProps[imgState] && itemProps[imgState]['borderBottomRightRadius']) ? `${ itemProps[imgState]['borderBottomRightRadius']}px` : '0px',
            //     // boxShadow : (itemProps[imgState] && itemProps[imgState]['shadowColor']) ? `${ itemProps[imgState]['shadowOffsetX'] ?  itemProps[imgState]['shadowOffsetX'] : 0}px ${ itemProps[imgState]['shadowOffsetY'] ?  itemProps[imgState]['shadowOffsetY'] : 0}px ${ itemProps[imgState]['shadowBlur'] ?  itemProps[imgState]['shadowBlur'] : 0}px ${ itemProps[imgState]['shadowSpread'] ?  itemProps[imgState]['shadowSpread'] : 0}px rgba(${ itemProps[imgState]['shadowColor'].r},${ itemProps[imgState]['shadowColor'].g},${ itemProps[imgState]['shadowColor'].b},${ itemProps[imgState]['shadowColor'].a})` : 'none',
            //     // transform : 'rotate(0deg)'
            // };
            // if( itemProps[imgState] &&  itemProps[imgState]['borderWidth'] &&  itemProps[imgState]['borderWidth'] > 0) buttonStyle.border = `${ itemProps[imgState]['borderWidth']}px ${( itemProps[imgState]['borderType'])?  itemProps[imgState]['borderType'] : 'solid'} rgba(${(! itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].r},${(! itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].g},${(! itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].b},${(! itemProps[imgState]['borderColor']) ? 1 :  itemProps[imgState]['borderColor'].a}`;
            if(imgState != 'initiation' && init === true){
                // console.log('Set Image Style',imgState);
                setImgStyle((originStyle)=>{
                    return {
                        ...originStyle,
                        transitionDuration : ( itemProps[imgState] &&  itemProps[imgState]['transitionDuration']) ? `${itemProps[imgState]['transitionDuration']}s` : '0s',
                        opacity : ( itemProps[imgState] &&  itemProps[imgState]['opacity']) ?  itemProps[imgState]['opacity'] : 1,
                        boxShadow : ( itemProps[imgState] && itemProps[imgState]['shadowColor']) ? `${ itemProps[imgState]['shadowOffsetX'] ?  itemProps[imgState]['shadowOffsetX'] : 0}px ${ itemProps[imgState]['shadowOffsetY'] ?  itemProps[imgState]['shadowOffsetY'] : 0}px ${ itemProps[imgState]['shadowBlur'] ?  itemProps[imgState]['shadowBlur'] : 0}px ${ itemProps[imgState]['shadowSpread'] ?  itemProps[imgState]['shadowSpread'] : 0}px rgba(${ itemProps[imgState]['shadowColor'].r},${ itemProps[imgState]['shadowColor'].g},${ itemProps[imgState]['shadowColor'].b},${ itemProps[imgState]['shadowColor'].a})` : 'none',
                        transform : ( itemProps[imgState] && itemProps[imgState]['rotation']) ? `rotate(${itemProps[imgState]['rotation']}deg)` : 'rotate(0deg)',
                        filter: `grayscale(${(itemProps[imgState] && itemProps[imgState]['greyScale']) ? itemProps[imgState]['greyScale']+'%' : '0%' })`,
                        objectFit : (itemProps['default'] && itemProps['default']['objectFit']) ? itemProps['default']['objectFit'] : 'contain',
                        opacity : (itemProps[imgState] &&  itemProps[imgState]['opacity']) ?  itemProps[imgState]['opacity'] : 1,
                        border : (itemProps[imgState] && itemProps[imgState]['borderWidth'] && itemProps[imgState]['borderWidth'] > 0) ? `${itemProps[imgState]['borderWidth']}px ${(itemProps[imgState]['borderType'])? itemProps[imgState]['borderType'] : 'solid'} rgba(${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].r},${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].g},${(!itemProps[imgState]['borderColor']) ? 0 :  itemProps[imgState]['borderColor'].b},${(!itemProps[imgState]['borderColor']) ? 1 : itemProps[imgState]['borderColor'].a}` : "none",
                        borderTopLeftRadius : (itemProps[imgState] && itemProps['default']['borderTopLeftRadius']) ? `${ itemProps['default']['borderTopLeftRadius']}px` : '0px',
                        borderTopRightRadius : (itemProps[imgState] && itemProps['default']['borderTopRightRadius']) ? `${ itemProps['default']['borderTopRightRadius']}px` : '0px',
                        borderBottomLeftRadius : (itemProps[imgState] && itemProps['default']['borderBottomLeftRadius']) ? `${ itemProps['default']['borderBottomLeftRadius']}px` : '0px',
                        borderBottomRightRadius : (itemProps[imgState] && itemProps['default']['borderBottomRightRadius']) ? `${ itemProps['default']['borderBottomRightRadius']}px` : '0px',
                        marginTop : ( itemProps[imgState] &&  itemProps[imgState]['marginTop']) ?  itemProps[imgState]['marginTop'] : 0,
                        marginLeft : ( itemProps[imgState] &&  itemProps[imgState]['marginLeft']) ?  itemProps[imgState]['marginLeft'] : 0,
                        // marginBottom : ( itemProps[imgState] &&  itemProps[imgState]['marginBottom']) ?  itemProps[imgState]['marginBottom'] : 0,
                    }
                })
            }
            //     // console.log(imgState);
                // imgStyle = {
                //     ...imgStyle,
                //     // transitionDuration : (itemProps[imgState] && itemProps[imgState]['transitionDuration']) ? `${itemProps[imgState]['transitionDuration']}s` : '0s',
                //     transitionDuration : '0.2s',
                //     // opacity : ( itemProps[imgState] &&  itemProps[imgState]['opacity']) ?  itemProps[imgState]['opacity'] : 1,
                //     boxShadow : ( itemProps[imgState] && itemProps[imgState]['shadowColor']) ? `${ itemProps[imgState]['shadowOffsetX'] ?  itemProps[imgState]['shadowOffsetX'] : 0}px ${ itemProps[imgState]['shadowOffsetY'] ?  itemProps[imgState]['shadowOffsetY'] : 0}px ${ itemProps[imgState]['shadowBlur'] ?  itemProps[imgState]['shadowBlur'] : 0}px ${ itemProps[imgState]['shadowSpread'] ?  itemProps[imgState]['shadowSpread'] : 0}px rgba(${ itemProps[imgState]['shadowColor'].r},${ itemProps[imgState]['shadowColor'].g},${ itemProps[imgState]['shadowColor'].b},${ itemProps[imgState]['shadowColor'].a})` : 'none',
                //     transform : ( itemProps[imgState] && itemProps[imgState]['rotation']) ? `rotate(${itemProps[imgState]['rotation']}deg)` : 'rotate(0deg)'
                // }
                // if( itemProps[imgState] &&  itemProps[imgState]['borderWidth'] &&  itemProps[imgState]['borderWidth'] > 0) buttonStyle.border = `${itemProps[imgState]['borderWidth']}px ${(itemProps[imgState]['borderType'])?  props['borderType'] : 'solid'} rgba(${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].r},${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].g},${(!itemProps[imgState]['borderColor']) ? 0 : itemProps[imgState]['borderColor'].b},${(!itemProps[imgState]['borderColor']) ? 1 :  itemProps[imgState]['borderColor'].a}`;
                // console.log(buttonStyle)
            // }
            // console.log('Set Image Style',imgStyle);
            // setImgStyle(imgStyle)
    },[JSON.stringify(itemProps),imgState,init])
    useEffect(()=>{
        // console.log('Image Props',props['image']);
        // if(props && props['image']) getImage(props['image'],setImageSrc);
        if(itemProps['default'] && itemProps['default']['image']){
            if(itemProps['default']['image']['key']){
                console.log('New Context',itemProps['default']['image']['key']);
                if(itemProps['default']['image']['key'].includes('https://')) {
                    setImageSrc(itemProps['default']['image'])
                } else {
                    // getImage(itemProps['default']['image'],setImageSrc);
                    setImageSrc(`data:image/png;base64,${itemProps['default']['image']}`)
                };
            } else {
                setImageSrc(`data:image/png;base64,${itemProps['default']['image']}`)
            }
        }
    },[JSON.stringify(itemProps)])
    useEffect(()=>{
        if(itemActions['onMouseDown']){
            if(itemActions['onMouseDown']['link'] ){
                let url;
                let newWindow = (itemActions['onMouseDown']['link']['newWindow'] && itemActions['onMouseDown']['link']['newWindow'] == true);
                let urlTab;
                if(itemActions['onMouseDown']['link']['source']){
                    // if(itemActions['onMouseDown']['link']['source']['url']){
                    //     url = itemActions['onMouseDown']['link']['source']['url'];
                    // }
                    // if(itemActions['onMouseDown']['link']['source']['tabId']){
                    //     const targetTab = displayTab.filter((tab)=>tab.id == itemActions['onMouseDown']['link']['source']['tabId']);
                    //     if(targetTab.length == 1){
                    //         const value = targetTab[0];
                    //         urlTab = value;
                    //         if(subDomainMode === true) {
                    //             if(value.route !== null){
                    //                 if(value.route === ""){
                    //                     url = (rootRoute == "/") ?  '/': '/home';
                    //                 } else {
                    //                     url = '/'+value.route;
                    //                 }
                    //             } else {
                    //                 url = '/'+value.id;
                    //             }
                    //         } else {
                    //             url = '/panel'+'/'+value.panelID+'/'+value.id;
                    //         }
                    //     }
                    // }
                }
                setLinkAction({ url : url , newWindow : newWindow , urlTab : urlTab });
            }
        }
    },[JSON.stringify(itemActions)])
    // return useMemo(()=>
    //     <img style={imgStyle} src={"https://images.unsplash.com/photo-1612699001349-617d44e98faf?crop=entropy&cs=srgb&fm=jpg&ixid=MXwyMDgxMDh8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=85"} />
    // ,[imgStyle])
    return (itemProps) ? (
        <div 
            style={{
                ...styles.mainContainer,
                alignItems : (itemProps[imgState] && itemProps[imgState]['horizontalAlignment']) ? itemProps[imgState]['horizontalAlignment'] : 'center',
                justifyContent : (itemProps[imgState] && itemProps[imgState]['verticalAlignment']) ? itemProps[imgState]['verticalAlignment'] : 'center',
                backgroundColor : (itemProps[imgState] && itemProps[imgState]['backgroundColor']) ? `rgba(${itemProps[imgState]['backgroundColor'].r},${itemProps[imgState]['backgroundColor'].g},${itemProps[imgState]['backgroundColor'].b},${itemProps[imgState]['backgroundColor'].a})` : 'transparent',
                cursor : (linkAction && (linkAction.url || linkAction.urlTab)) ? 'pointer' : 'default',
                marginBottom : ( itemProps['default'] &&  itemProps['default']['marginBottom']) ?  itemProps['default']['marginBottom'] : 0,
                marginRight : ( itemProps['default'] &&  itemProps['default']['marginRight']) ?  itemProps['default']['marginRight'] : 0
            }}
        >
            {(imageSrc) ? 
                <div
                    style={{ 
                        height : '100%' , 
                        width : '100%' ,
                        transitionDuration : '0.2s',
                        paddingTop : ( itemProps[imgState] &&  itemProps[imgState]['paddingTop']) ?  itemProps[imgState]['paddingTop'] : itemProps['default']['paddingTop'],
                        paddingBottom : ( itemProps[imgState] &&  itemProps[imgState]['paddingBottom']) ?  itemProps[imgState]['paddingBottom'] : itemProps['default']['paddingBottom'],
                        paddingLeft: ( itemProps[imgState] &&  itemProps[imgState]['paddingLeft']) ?  itemProps[imgState]['paddingLeft'] : itemProps['default']['paddingLeft'],
                        paddingRight : (  itemProps[imgState] &&  itemProps[imgState]['paddingRight']) ?  itemProps[imgState]['paddingRight'] : itemProps['default']['paddingRight'],
                        // marginRight : 100,
                        // marginTop : ( itemProps[imgState] &&  itemProps[imgState]['marginTop']) ?  itemProps[imgState]['marginTop'] : 0,
                        // marginBottom : ( itemProps['default'] &&  itemProps['default']['marginBottom']) ?  itemProps['default']['marginBottom'] : 0,
                        // marginRight : ( itemProps['default'] &&  itemProps['default']['marginRight']) ?  itemProps['default']['marginRight'] : 0,
                        // marginLeft : ( itemProps[imgState] &&  itemProps[imgState]['marginLeft']) ?  itemProps[imgState]['marginLeft'] : 0,
                    }}
                    onMouseEnter={()=>setImgState('hover')}
                    onMouseLeave={()=>setImgState('default')}
                    onMouseDown={()=>setImgState('default')}
                    onClick={()=>{
                        // if(linkAction && (linkAction.url || linkAction.urlTab)){
                        //     console.log('LinkAction',linkAction);
                        //     if(linkAction.urlTab){
                        //         console.log('Tab Change')
                        //         if (linkAction.newWindow == true){
                        //             window.open(linkAction['url'])
                        //         } else {
                        //             setTabId(linkAction.urlTab.id);
                        //             router.push(rootRoute, linkAction['url'] ,{ shallow : true });
                        //             setTitle(`${(linkAction.urlTab.name) ? linkAction.urlTab.name : 'Flexpanel'} | ${panelName}`)
                        //         }
                        //     } else {
                        //         console.log('Url Change');
                        //         if (linkAction.newWindow == true) window.open(linkAction['url']);
                        //         if (linkAction.newWindow == false) window.location.href = linkAction['url'];
                        //     }
                        // }
                    }}
                >
                    <a href={(linkAction && linkAction.url) ? linkAction.url : null}></a>
                    {/* <img style={imgStyle} src={imageSrc}/>  */}
                    <img style={imgStyle} src={imageSrc}/> 
                </div>
                : null}
        </div>
    ) : null;
    
}

const styles = {
    mainContainer : {
        display : 'flex',
        height : '100%',
        width : '100%',
        // flex : 1,
        // alignSelf : 'stretch',
        // flexDirection : 'column',
        overflowY : 'hidden',
        overflowX : 'scroll'
    }
}

export default ImageWidget;