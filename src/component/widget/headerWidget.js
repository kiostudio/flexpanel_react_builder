import { useEffect , useState , useMemo } from 'react';

const renderHeader = (item,name,setName,setGridSave,setSelectedGrid,selectedGrid,setLayouts,currentBreakPoint,setShowSideMenu,userRole,componentState)=>{
    let headerStyle = {
        margin : 0
    };
    if(item.component.props){
        if(item.component.props[componentState]['fontColor']) headerStyle.color = `rgba(${item.component.props[componentState]['fontColor'].r},${item.component.props[componentState]['fontColor'].g},${item.component.props[componentState]['fontColor'].b},${item.component.props[componentState]['fontColor'].a})`;
        if(item.component.props[componentState]['fontFamily']) headerStyle.fontFamily = item.component.props[componentState]['fontFamily'];
        if(item.component.props[componentState]['fontSize']) headerStyle.fontSize = item.component.props[componentState]['fontSize'];
        if(item.component.props[componentState]['fontWeight']) headerStyle.fontWeight = item.component.props[componentState]['fontWeight'];
        if(item.component.props[componentState]['fontStyle']) headerStyle.fontStyle = item.component.props[componentState]['fontStyle'];
        if(item.component.props[componentState]['textDecoration']) headerStyle.textDecoration = item.component.props[componentState]['textDecoration'];
        if(item.component.props[componentState]['shadowColor']) headerStyle.textShadow = `${item.component.props[componentState]['shadowOffsetX'] ? item.component.props[componentState]['shadowOffsetX'] : 0}px ${item.component.props[componentState]['shadowOffsetY'] ? item.component.props[componentState]['shadowOffsetY'] : 0}px ${item.component.props[componentState]['shadowBlur'] ? item.component.props[componentState]['shadowBlur'] : 0}px rgba(${item.component.props[componentState]['shadowColor'].r},${item.component.props[componentState]['shadowColor'].g},${item.component.props[componentState]['shadowColor'].b},${item.component.props[componentState]['shadowColor'].a})`;
        // console.log(item.component.props['headerType']);
        switch(item.component.props[componentState]['headerType']){
            case 'h1':
                return <h1 style={headerStyle}>{name}</h1>
            case 'h2':
                return <h2 style={headerStyle}>{name}</h2>
            case 'h3':
                return <h3 style={headerStyle}>{name}</h3>
            case 'h4': 
                return <h4 style={headerStyle}>{name}</h4>
            case 'h5':
                return <h5 style={headerStyle}>{name}</h5>
            default:
                return <h1 style={headerStyle}>{name}</h1>
        }
    } else {
        return <h1 style={headerStyle}>{name}</h1>
    }
}

function HeaderWidget({props,item,userRole,setGridSave,setSelectedGrid,selectedGrid,setLayouts,currentBreakPoint,setShowSideMenu,componentState}){
    // console.log(props,componentState);
    const [name,setName] = useState((props && props[componentState] && props[componentState]['textContent']) ? props[componentState]['textContent'] : null);
    // console.log('New Context',item);
    const propsText = (props && props[componentState] && props[componentState]['textContent']) ? props[componentState]['textContent'] : null;
    useEffect(()=>{
        setName(propsText);
    },[propsText])
    // const renderHedaer = useMemo(()=>{
    //     console.log('New Context',item)
    //     return(
    //         <div style={styles.mainContainer}>
    //             {/* {(props && props['textContent']) ? props['textContent'] : null} */}
    //             {renderHeader(item,name,setName,setGridSave,setSelectedGrid,selectedGrid,setLayouts,currentBreakPoint)}
    //         </div>
    //     )
    // },[props['textContent']])
    return (
        <div 
            style={{
                ...styles.mainContainer,
                alignItems : (props && props[componentState] && props[componentState]['horizontalAlignment']) ? props[componentState]['horizontalAlignment'] : 'center',
                justifyContent : (props && props[componentState] && props[componentState]['verticalAlignment']) ? props[componentState]['verticalAlignment'] : 'center',
                backgroundColor : (props && props[componentState] && props[componentState]['backgroundColor']) ? `rgba(${props[componentState]['backgroundColor'].r},${props[componentState]['backgroundColor'].g},${props[componentState]['backgroundColor'].b},${props[componentState]['backgroundColor'].a})` : 'transparent',
                marginTop : ( props && props[componentState] &&  props[componentState]['marginTop']) ?  props[componentState]['marginTop'] : 0,
                marginBottom : ( props && props[componentState] &&  props[componentState]['marginBottom']) ?  props[componentState]['marginBottom'] : 0,
                marginRight : ( props && props[componentState] &&  props[componentState]['marginRight']) ?  props[componentState]['marginRight'] : 0,
                marginLeft : ( props && props[componentState] &&  props[componentState]['marginLeft']) ?  props[componentState]['marginLeft'] : 0,
                paddingTop : ( props && props[componentState] &&  props[componentState]['paddingTop']) ?  props[componentState]['paddingTop'] : 0,
                paddingBottom : ( props && props[componentState] &&  props[componentState]['paddingBottom']) ?  props[componentState]['paddingBottom'] : 0,
                paddingLeft: ( props && props[componentState] &&  props[componentState]['paddingLeft']) ?  props[componentState]['paddingLeft'] : 0,
                paddingRight : ( props && props[componentState] &&  props[componentState]['paddingRight']) ?  props[componentState]['paddingRight'] : 0
            }}
        >
            {renderHeader(item,name,setName,setGridSave,setSelectedGrid,selectedGrid,setLayouts,currentBreakPoint,setShowSideMenu,userRole,componentState)}
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

export default HeaderWidget;