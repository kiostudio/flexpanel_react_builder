import { useEffect , useState , useMemo , useRef } from 'react';
// import { Spinner } from "@blueprintjs/core";
// import { API , Storage } from 'aws-amplify';

function VideoWidget({props}){
    const [videoSrc,setVideoSrc] = useState(null);
    const [control,setControl] = useState((props['control'] !== null && props['control'] === false) ? 0 : 1);
    const [mute,setMute] = useState((props['mute'] !== null && props['mute'] === true) ? 1 : 0);
    const [loop,setLoop] = useState((props['loop'] !== null && props['loop'] === true) ? 1 : 0);
    const [autoPlay,setAutoPlay] = useState((props['autoPlay'] !== null && props['autoPlay'] === true) ? 1 : 0);
    const videoWrapperRef = useRef(null);
    useEffect(()=>{
        setVideoSrc(props['video']);
    },[props['video']])
    useEffect(()=>{
        setControl((props['control'] !== null && props['control'] === false) ? 0 : 1);
    },[props['control']])
    useEffect(()=>{
        setMute((props['mute'] !== null && props['mute'] === true) ? 1 : 0);
    },[props['mute']])
    useEffect(()=>{
        setLoop((props['loop'] !== null && props['loop'] === true) ? 1 : 0)
    },[props['loop']])
    useEffect(()=>{
        setAutoPlay((props['autoPlay'] !== null && props['autoPlay'] === true) ? 1 : 0);
    },[props['autoPlay']])
    // console.log('Vide props : ',props['control'],control);
    const youTubeRender = useMemo(()=>{
        return(videoSrc !== null && videoSrc !== undefined && videoSrc.includes('https://youtu.be') && videoWrapperRef.current) ? (
            <iframe style={{
                // width : '100%',
                // height : '100%',
                height : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetHeight * 1  : '100%',
                width : (videoWrapperRef.current !== null) ? videoWrapperRef.current.offsetHeight * 1 / 9 * 16 : '100%',
                objectFit : 'cover'
              }} src={`https://www.youtube.com/embed/${videoSrc.replace('https://youtu.be','')}?controls=${(control) ? (control === true) ? 1 : 0 : 0}&autoplay=${autoPlay}&mute=${mute}&loop=${loop}&rel=0&playlist=${videoSrc.replace('https://youtu.be/','')}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 
        ) : null;
    },[control,videoSrc,mute,loop,videoWrapperRef])
    return (
        <div 
            style={{
                ...styles.mainContainer,
                alignItems : (props && props['horizontalAlignment']) ? props['horizontalAlignment'] : 'center',
                justifyContent : (props && props['verticalAlignment']) ? props['verticalAlignment'] : 'center',
                backgroundColor : (props && props['backgroundColor']) ? `rgba(${props['backgroundColor'].r},${props['backgroundColor'].g},${props['backgroundColor'].b},${props['backgroundColor'].a})` : 'transparent',
                marginTop : ( props &&  props['marginTop']) ?  props['marginTop'] : 0,
                marginBottom : ( props &&  props['marginBottom']) ?  props['marginBottom'] : 0,
                marginRight : ( props &&  props['marginRight']) ?  props['marginRight'] : 0,
                marginLeft : ( props &&  props['marginLeft']) ?  props['marginLeft'] : 0,
                paddingTop : ( props &&  props['paddingTop']) ?  props['paddingTop'] : 0,
                paddingBottom : ( props &&  props['paddingBottom']) ?  props['paddingBottom'] : 0,
                paddingLeft: ( props &&  props['paddingLeft']) ?  props['paddingLeft'] : 0,
                paddingRight : ( props &&  props['paddingRight']) ?  props['paddingRight'] : 0
            }}
            ref={videoWrapperRef}
        >
            {(videoSrc !== null && videoSrc !== undefined ) ?
              (videoSrc.includes('https://youtu.be')) ? 
                  youTubeRender
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
                id="background-video" loop={loop} autoPlay={autoPlay} muted={mute} controls={control}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>  
              : null}
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

export default VideoWidget;