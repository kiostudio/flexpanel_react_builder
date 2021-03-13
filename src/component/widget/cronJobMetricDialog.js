import { useEffect , useState , useMemo } from 'react';
import { API , Storage } from 'aws-amplify';
import { Button , Tabs , Tab  , Icon , Classes, Tag } from "@blueprintjs/core";
import { VictoryChart , VictoryLine , VictoryTheme , VictoryScatter , VictoryTooltip , VictoryContainer } from "victory";

function CronJobMetricDialog ({metricJob,setMetricDialog}){
    const { metrics } = metricJob;
    // console.log(metrics);
    const [total,setTotal] = useState({ favorite_count : 0 , retweet_count : 0 });
    const [dataPoints,setDataPoints] = useState(null);
    const [selectedTab,setSelectedTab] = useState('chart');
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        if(metricJob.contentID && metricJob.status === 'success') document.getElementsByClassName("twitter-tweet")[0].appendChild(script);
    }, []);
    useEffect(()=>{
        const total = { favorite_count : 0 , retweet_count : 0 }
        const dataPoints = { favorite_count : [] , retweet_count: [] };
        metrics.items.map((dataPoint)=>{
            // console.log(dataPoint);
            const tweetData = JSON.parse(dataPoint.data);
            total.favorite_count += tweetData.favorite_count;
            total.retweet_count += tweetData.retweet_count;
            dataPoints.favorite_count.push({ x : new Date(dataPoint.createdAt) , y : tweetData.favorite_count.toFixed(0) })
            dataPoints.retweet_count.push({ x : new Date(dataPoint.createdAt) , y : tweetData.retweet_count.toFixed(0) })
        })
        setTotal(total);
        setDataPoints(dataPoints);
    },[]);
    const TweetPreview = useMemo(()=>{
        return(
            <blockquote className="twitter-tweet">
                <a href={"https://twitter.com/desktourdaily/status/"+metricJob.contentID}></a>
            </blockquote>
        )
    },[]);
    const TweetMetricFavourite = useMemo(()=>{
        // const heightParam =  (deviceAgent.platform.type == "mobile") ? 0.4 : 0.3;
        return (dataPoints !== null) ? 
            <div style={{ width : '100%' , display : 'flex' , alignItems : 'center' , justifyContent : 'center' , marginLeft : 10 , overflow : 'none' }}>
                <VictoryChart
                    // key={index}
                    theme={{
                        ...VictoryTheme.material,
                        axis: {
                            ...VictoryTheme.material.axis,
                            style: {
                                ...VictoryTheme.material.axis.style,
                                tickLabels: {
                                    ...VictoryTheme.material.axis.style.tickLabels,
                                    // this changed the color of my numbers to white
                                    fill: 'white',
                                },
                            },
                        },
                    }}
                    // containerComponent={<svg viewBox="0 0 100% auto" />}
                    height={200}
                    // width={100}
                    // viewBox={"0 0 width, height"}
                >
                    <VictoryScatter
                        style={{ data: { fill: 'red' } }}
                        size={2}
                        data={dataPoints.favorite_count}
                        labels={({ datum }) => `${datum.x.toLocaleDateString()} ${datum.x.toLocaleTimeString()} - ${datum.y}`}
                        labelComponent={
                            <VictoryTooltip/>
                        }
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: 'red' },
                            parent: { border: "0.5px solid #ccc"}
                        }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        data={dataPoints.favorite_count}
                    />
                </VictoryChart>
            </div> : null
    },[dataPoints]);
    const TweetMetricRetweet = useMemo(()=>{
        // const heightParam =  (deviceAgent.platform.type == "mobile") ? 0.4 : 0.3;
        return (dataPoints !== null) ? 
            <div style={{ width : '100%' , display : 'flex' , alignItems : 'center' , justifyContent : 'center' , marginLeft : 10 , overflow : 'none' }}>
                <VictoryChart
                    // key={index}
                    theme={{
                        ...VictoryTheme.material,
                        axis: {
                            ...VictoryTheme.material.axis,
                            style: {
                                ...VictoryTheme.material.axis.style,
                                tickLabels: {
                                    ...VictoryTheme.material.axis.style.tickLabels,
                                    // this changed the color of my numbers to white
                                    fill: 'white',
                                },
                            },
                        },
                    }}
                    // containerComponent={<svg viewBox="0 0 100% auto" />}
                    // height={600}
                    height={200}
                    // width={100}
                    // viewBox={"0 0 width, height"}
                >
                    <VictoryScatter
                        style={{ data: { fill: 'green' } }}
                        size={2}
                        data={dataPoints.retweet_count}
                        labels={({ datum }) => `${datum.x.toLocaleDateString()} ${datum.x.toLocaleTimeString()} - ${datum.y}`}
                        labelComponent={
                            <VictoryTooltip/>
                        }
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: 'green' },
                            parent: { border: "0.5px solid #ccc"}
                        }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        data={dataPoints.retweet_count}
                    />
                </VictoryChart>
            </div> : null
    },[dataPoints]);
    const ChartTag = useMemo(()=>{
        return(
            <div style={{ width : '100%' , display : 'flex' , alignItems : 'center' , justifyContent : 'center' , overflow : 'none' ,  marginTop : 10 }}>
                <Tag style={{ marginRight : 5 , minWidth : 100 , backgroundColor : '#000000' }}>
                    <Icon icon={'dot'} color={'red'}/>
                    <span>{`Favorite Count : ${total.favorite_count}`}</span>
                </Tag>
                <Tag style={{ marginRight : 5 , minWidth : 100 , backgroundColor : '#000000' }}>
                    <Icon icon={'dot'} color={'green'}/>
                    <span>{`Retweet Count : ${total.retweet_count}`}</span>
                </Tag>
            </div>
        )
    },[dataPoints])
    return(
        <div>
            <h2 className={Classes.DIALOG_HEADER} style={styles.dialogHeader}>
                {'Job Metric Performance'}
            </h2>
            <div className={Classes.DIALOG_BODY}>
                <Tabs id="panelSetting" onChange={(selectedTabId)=>setSelectedTab(selectedTabId)} selectedTabId={selectedTab}>
                    <Tab id="chart" title="Metric Chart" style={(selectedTab === "chart") ? styles.tabSelected : styles.tabIdle} panel={
                        (dataPoints !== null && dataPoints.retweet_count.length > 0 && dataPoints.favorite_count.length > 0) ?
                        <div>
                            {ChartTag}
                            {TweetMetricFavourite}
                            {TweetMetricRetweet}
                        </div> : <h4 style={{ color : '#FFFFFF' }}>{'No Preview'}</h4>
                    } />
                    <Tab id="preview" title="Preview" style={(selectedTab === "preview") ? styles.tabSelected : styles.tabIdle}  panel={(metricJob.contentID && metricJob.status === 'success') ? TweetPreview : <h4 style={{ color : '#FFFFFF' }}>{'No Preview'}</h4>} />
                </Tabs>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button style={styles.actionButtons} text="Cancel" onClick={()=>setMetricDialog(false)}/>
                </div>
            </div>
        </div>
    )
}

const styles = {
    inputField : {
        color : '#C5E4FC' , 
        fontWeight : 'bold'
    },
    dialogHeader : {
        color : '#FFFFFF',
        backgroundColor : '#30404D'
    },
    actionButtons : {
        fontWeight : 'bold'
    },
    metricSummaryContainer : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around'
    },
    tabSelected : {
        color : 'rgb(50, 163, 252)',
        fontWeight : 'bold'
    },
    tabIdle : {
        color : '#FFFFFF'
    }
}

export default CronJobMetricDialog;