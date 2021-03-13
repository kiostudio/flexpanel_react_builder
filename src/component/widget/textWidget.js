import { useEffect , useState , useMemo } from 'react';

const renderTextArea = (item,content,componentState)=>{
    let textStyle = {
        width : '100%' , 
        height : 'auto' 
    };
    if(item.component.props && item.component.props[componentState]){
        if(item.component.props[componentState]['fontColor']) textStyle.color = `rgba(${item.component.props[componentState]['fontColor'].r},${item.component.props[componentState]['fontColor'].g},${item.component.props[componentState]['fontColor'].b},${item.component.props[componentState]['fontColor'].a})`;
        if(item.component.props[componentState]['fontFamily']) textStyle.fontFamily = item.component.props[componentState]['fontFamily'];
        if(item.component.props[componentState]['fontSize']) textStyle.fontSize = item.component.props[componentState]['fontSize'];
        if(item.component.props[componentState]['fontWeight']) textStyle.fontWeight = item.component.props[componentState]['fontWeight'];
        if(item.component.props[componentState]['fontStyle']) textStyle.fontStyle = item.component.props[componentState]['fontStyle'];
        if(item.component.props[componentState]['textDecoration']) textStyle.textDecoration = item.component.props[componentState]['textDecoration'];
        if(item.component.props[componentState]['shadowColor']) textStyle.textShadow = `${item.component.props[componentState]['shadowOffsetX'] ? item.component.props[componentState]['shadowOffsetX'] : 0}px ${item.component.props[componentState]['shadowOffsetY'] ? item.component.props[componentState]['shadowOffsetY'] : 0}px ${item.component.props[componentState]['shadowBlur'] ? item.component.props[componentState]['shadowBlur'] : 0}px rgba(${item.component.props[componentState]['shadowColor'].r},${item.component.props[componentState]['shadowColor'].g},${item.component.props[componentState]['shadowColor'].b},${item.component.props[componentState]['shadowColor'].a})`;
        if(item.component.props[componentState]['horizontalAlignment']) textStyle.textAlign = item.component.props[componentState]['horizontalAlignment']
        // console.log(item.component.props['headerType']);
        return <p style={textStyle}>{content}</p>
    } else {
        return <p style={textStyle}>{content}</p>
    }
}

function TextWidget({props,item,componentState}){
    // const [content,setContent] = useState((props && props['textContent']) ? props['textContent'] : null);
    const [content,setContent] = useState((props && props[componentState] && props[componentState]['textContent']) ? props[componentState]['textContent'] : null);
    // console.log('New Context',item);
    const propsText = (props && props[componentState] && props[componentState]['textContent']) ? props[componentState]['textContent'] : null;
    useEffect(()=>{
        setContent(propsText);
    },[propsText])
    // useEffect(()=>{
    //     if(props && props['textContent']) setContent(props['textContent']);
    // },[props['textContent']])
    return (
        <div 
            style={{
                ...styles.mainContainer,
                alignItems : 'center',
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
            {renderTextArea(item,content,componentState)}
        </div>
    )
    
    
}

const styles = {
    mainContainer : {
        display : 'flex',
        flex : 1,
        alignSelf : 'stretch',
        flexDirection : 'column',
        overflowY : 'scroll',
        overflowX : 'hidden'
    }
}

export default TextWidget;