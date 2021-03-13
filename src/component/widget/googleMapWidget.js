import { useEffect , useState , useMemo , useRef } from 'react';
// import { Spinner } from "@blueprintjs/core";
// import { API , Storage } from 'aws-amplify';

function GoogleMapWidget({itemProps,userRole}){
    const [mapSrc,setMapSrc] = useState(null);
    const [zoom,setZoom] = useState(null);
    const [mapState] = useState('default');
    const [props,setSelectProps] = useState((itemProps && itemProps[mapState]) ? itemProps[mapState] : {});
    useEffect(()=>{
        if(itemProps[mapState] && itemProps[mapState]['mapSrc']) setMapSrc(itemProps[mapState]['mapSrc']);
        if(itemProps[mapState] && itemProps[mapState]['zoom']) setZoom(itemProps[mapState]['zoom']);
    },[JSON.stringify(itemProps)])
    return (
        <div 
            style={{
                ...styles.mainContainer,
                paddingTop : ( props &&  props['paddingTop']) ?  props['paddingTop'] : 0,
                paddingBottom : ( props &&  props['paddingBottom']) ?  props['paddingBottom'] : 0,
                paddingLeft: ( props &&  props['paddingLeft']) ?  props['paddingLeft'] : 0,
                paddingRight : ( props &&  props['paddingRight']) ?  props['paddingRight'] : 0
            }}
        >
            <iframe
                width="600"
                height="450"
                style={{ border : 0 , width : '100%' , height : '100%'}}
                loading="lazy"
                allowFullScreen={true}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDa7xejREE2xuknx23s7DDn4Bm4DYjqM5g&q=${(mapSrc) ? mapSrc : 'hongkong'}&zoom=${(zoom) ? zoom : 16}`}>
            </iframe>
        </div>
    );
    // Sunray Industrial Centre, Yau Tong,Hong Kong
    // &zoom=16
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

export default GoogleMapWidget;