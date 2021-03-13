import { useEffect , useMemo, useState } from 'react';
import { InputGroup , Icon , Classes , Navbar , Button , ButtonGroup , Tag , TagInput , Popover , Tooltip , Menu , MenuItem , Spinner , HTMLTable , Switch , Position , Drawer ,  Toaster , Toast , Alignment, FormGroup } from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import { API , graphqlOperation } from 'aws-amplify';
import { AiOutlineTwitter } from 'react-icons/ai';
import { VictoryChart , VictoryLine , VictoryTheme , VictoryScatter , VictoryTooltip , VictoryContainer } from "victory";
import { updateComponent } from '../../graphql/mutations';
// import { twitterTrendVolumeByCreatedAt } from '../../graphql/queries';
// import { onCreateTwitterTrendVolume } from '../../graphql/subscriptions';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

const twitterTrendVolumeByCreatedAt = gql`
  query TwitterTrendVolumeByCreatedAt(
    $twitterTrendID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTwitterTrendVolumeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    twitterTrendVolumeByCreatedAt(
      twitterTrendID: $twitterTrendID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        volume
        twitterTrendID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
const onCreateTwitterTrendVolume = gql`
  subscription OnCreateTwitterTrendVolume {
    onCreateTwitterTrendVolume {
      id
      volume
      twitterTrendID
      createdAt
      updatedAt
    }
  }
`;

const getTwitterKeywordVolume = async(setTrends,keywords,dateFilter)=>{
    const client = new AWSAppSyncClient({
        url: "https://msakvqxdzjd2diuvkwt6oomtsy.appsync-api.us-east-1.amazonaws.com/graphql",
        region: "us-east-1",
        auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: "da2-3nrek4g6erccrlxscxcnddttz4"
        },
        disableOffline: true
    });
    client.hydrated().then(async(client)=>{    

        try {
            setTrends(null);
            Promise.all(keywords.map(async(keyword)=>{
                let queryParams = {
                    twitterTrendID : keyword.id,
                    sortDirection: 'ASC',
                    // createdAt : { between : ["2020-12-24T00:00:00.000Z","2021-01-07T00:00:00.000Z"] },
                    limit : 10000
                }
                if(dateFilter !== undefined && dateFilter !== null && dateFilter.length > 1){
                    console.log('Start Date : ', dateFilter[0].getDate());
                    console.log('End Date : ',dateFilter[1].getDate());
                    const startMonth = `${(dateFilter[0].getMonth()+1 < 10) ? 0 : ''}${dateFilter[0].getMonth()+1}`;
                    const startDate = `${(dateFilter[0].getDate()+1 < 10) ? 0 : ''}${dateFilter[0].getDate()}`;
                    const startDateString = `${dateFilter[0].getFullYear()}-${startMonth}-${startDate}T00:00:00.000Z`;
                    console.log('Format Start Date,',startDate);
                    const endMonth = `${(dateFilter[1].getMonth()+1 < 10) ? 0 : ''}${dateFilter[1].getMonth()+1}`;
                    const endDate = `${(dateFilter[1].getDate()+1 < 10) ? 0 : ''}${dateFilter[1].getDate()}`;
                    const endDateString = `${dateFilter[1].getFullYear()}-${endMonth}-${endDate}T00:00:00.000Z`;
                    queryParams.createdAt = { between :  [startDateString,endDateString] };
                }
                return client.query({ 
                    query: twitterTrendVolumeByCreatedAt,
                    variables : queryParams
                })
                .then(function logData(twitterTrendVolume) {
                    console.log('results of query: ', twitterTrendVolume);
                    // console.log('Twitter Trend',usTwitterTrend);
                    const dataPoints = twitterTrendVolume.data.twitterTrendVolumeByCreatedAt.items.map((data)=>{ 
                        return { x : new Date(data.createdAt) , y : data.volume }
                    });
                    return { data : dataPoints , color : (keyword.color) ? keyword.color : '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6) , name : keyword.name };
                })
                .catch((error)=>{
                    console.log('Error',error);
                    setLoading(false);
                });
    
                // const twitterTrendVolume =  await API.graphql({
                //     query : twitterTrendVolumeByCreatedAt,
                //     variables: queryParams
                // });
                // console.log('Twitter Trend Volume',queryParams,twitterTrendVolume);
                // const dataPoints = twitterTrendVolume.data.twitterTrendVolumeByCreatedAt.items.map((data)=>{ 
                //     return { x : new Date(data.createdAt) , y : data.volume }
                // });;
                // return { data : dataPoints , color : (keyword.color) ? keyword.color : '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6) , name : keyword.name }
            }))
            .then((res)=>{
                console.log('All Volume Response',res);
                setTrends(res);
                // console.log('US Twitter Trend Volume',usTwitterTrendVolume);
                // let trend = usTwitterTrendVolume.data.twitterTrendVolumeByCreatedAt.items.map((data)=>{ 
                //   return { x : new Date(data.createdAt) , y : data.volume }}
                // );
                // setTrend(trend)
            })
            .catch((err)=>{
                console.log('All Volume Error',err);
            });
        } catch (err) {
            console.log('Error',err);
        }

    });
}

const componenetUpdate = async(componentId,filterLock,keywords,dateRange,isLive)=>{
    let updateObj = { id : componentId };
    if(filterLock !== null) updateObj.filterLock = filterLock;
    if(keywords) updateObj.keywords = JSON.stringify(keywords);
    // console.log(dateRange);
    if(dateRange !== undefined && dateRange !== null && dateRange.length === 2){
      updateObj.dateFilterStart = dateRange[0];
      updateObj.dateFilterEnd = dateRange[1];
    } else {
      updateObj.dateFilterStart = null;
      updateObj.dateFilterEnd = null;
    }
    if(isLive !== null) updateObj.isLive = isLive;
    const updateComponentRequest = await API.graphql({
      query : updateComponent,
      variables: {
        input : updateObj
      }
    });
    console.log('Update Componeent Res',updateComponentRequest);
}

const resetChart = async(componentId,setLoading,reload)=>{
    try {
        setLoading(true);
        const updateComponentRequest = await API.graphql({
            query : updateComponent,
            variables: {
                input : { 
                    id : componentId,
                    filterLock : null,
                    keywords : null,
                    dateFilterStart : null,
                    dateFilterEnd: null,
                    isLive : null
                }
            }
        });
        setLoading(false);
        console.log('Update Componeent Res',updateComponentRequest);
        reload();
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}

function TwitterChartWidget({item,userRole,reload,setError,deviceAgent,setDragEnable}){
    const { component } = item
    console.log(deviceAgent);
    const [trends,setTrends] = useState(null);
    const [keywords] = useState((component.keywords) ? JSON.parse(component.keywords) : null);
    const [dateFilter,setDateFilter] = useState((component.dateFilterStart && component.dateFilterEnd) ? [new Date(component.dateFilterStart),new Date(component.dateFilterEnd)] : null);
    const [filterLock,setFilterLock] = useState((component.filterLock) ? component.filterLock : false);
    const [update,setUpdate] = useState(false);
    const [updateTime,setUpdateTime] = useState(new Date());
    const [isLive,setIsLive] = useState((component.isLive) ? component.isLive : false );
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(keywords) getTwitterKeywordVolume(setTrends,keywords,dateFilter);
    },[keywords,dateFilter]);
    useEffect(()=>{
        if(update === false && isLive == true) {
            setUpdateTime(new Date());
            getTwitterKeywordVolume(setTrends,keywords,dateFilter);
            setUpdate(false);
          }
    },[keywords,dateFilter,update,isLive]);
    useEffect(()=>{
        const client = new AWSAppSyncClient({
            url: "https://msakvqxdzjd2diuvkwt6oomtsy.appsync-api.us-east-1.amazonaws.com/graphql",
            region: "us-east-1",
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: "da2-3nrek4g6erccrlxscxcnddttz4"
            },
            disableOffline: true
        });
        client.hydrated().then(function (client) {
            const observable = client.subscribe({ query: onCreateTwitterTrendVolume });
            // const realtimeResults = function realtimeResults(data) {
            //     console.log('realtime data: ', data);
            // };
            observable.subscribe({
                next: ({ provider, value }) => { 
                // console.log({ provider, value });
                    setUpdate(true);
                },
                error: error => {
                    console.warn('Subscription Error : ',error);
                    setError({ message :'Disconnected. Please reload the page to enable real time updates.' , timeout : 100000 });
                },
                close: () =>{
                    console.warn('Subscription Close');
                }
            });
        });
      },[]);
      useEffect(()=>{
        const updateCycle = setInterval(()=>{
          // console.log('Update Trigger');
          setUpdate((lastStatus)=>{
            if(lastStatus == true){
              return false
            } 
            return lastStatus
          });
        },10000)
        // 900000
        return ()=>clearInterval(updateCycle);
      },[]);
    const renderTopBarDateFilter = useMemo(()=>{
        return(
            <Navbar.Group align={'right'} style={{ width : (item.w > 2) ? '50%' : '100%' , display : 'flex' , flexDirection : 'row' , justifyContent : 'flex-end' }}>
                {(userRole !== 'owner' && filterLock == true) ? 
                (dateFilter != null) ? <Tag>{`Period : ${dateFilter[0].toDateString()} - ${dateFilter[1].toDateString()}`}</Tag> : null
                : <FormGroup label={(item.w > 8) ? 'Last Update' : null} style={{ color : '#FFFFFF' , fontWeight : 'bold', marginRight : 20 }} inline={true}>
                    <DateRangeInput
                        startInputProps={{ style : { width : '100%', maxWidth : 120} }}
                        endInputProps={{ style : { width : '100%' , maxWidth : 120 } }}
                        popoverProps={{ canEscapeKeyClose : true }}
                        // fill={true}
                        formatDate={date => date.toLocaleDateString()}
                        onChange={(dateRange)=>{
                            console.log(dateRange);
                            if(dateRange[0] && dateRange[1]) {
                                setDateFilter(dateRange);
                                if(userRole === 'owner') componenetUpdate(component.id,null,null,dateRange);
                            } else {
                                setDateFilter(null);
                                if(userRole === 'owner') componenetUpdate(component.id,null,null,null);
                            };
                        }}
                        parseDate={str => new Date(str)}
                        value={(dateFilter != null) ? [dateFilter[0], dateFilter[1]] : []}
                    />  
                    {(dateFilter) ? <Button icon={'cross'} minimal={true} onClick={()=>{
                        setDateFilter(null);
                        if(userRole === 'owner') componenetUpdate(component.id,null,null,null);
                    }}/> : null}
                </FormGroup>}
            </Navbar.Group>
        )
    },[item.w,dateFilter]);
    const renderTopBarHeader = useMemo(()=>{
        return (
            <Navbar.Group align={"left"} style={{ width : (item.w > 2) ? '50%' : '100%' }}>
                {(userRole === 'owner') ? <Button icon={(filterLock === true) ? 'lock' : 'unlock'} minimal={true} style={{ marginRight : (item.w > 6) ? 20 : 5  }} 
                    onClick={()=>{ 
                    componenetUpdate(component.id,!filterLock);
                    setFilterLock(!filterLock);
                }}/> : null}
                <div style={{ backgroundColor : '#32A3FC' , fontWeight : 'bold' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center' , padding : '5px 10px' , borderRadius : 50 }}>
                    <AiOutlineTwitter color={'#FFFFFF'} style={{ marginRight : 5 }}/>
                    <h4 style={{ margin : 0 , color : '#FFFFFF' }}>{'Twitter'}</h4>
                </div>
                <h2 style={styles.header}>{'Tweet Volume'}</h2>
            </Navbar.Group>
        )
    },[filterLock])
    const renderChart = useMemo(()=>{
        const heightParam =  (deviceAgent.platform.type == "mobile") ? 0.4 : 0.3;
        return (trends && trends.length > 0) ? 
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
                    height={window.innerHeight * heightParam}
                    width={window.innerWidth}
                    // viewBox={"0 0 width, height"}
                >
                {trends.map((trend,index)=>{
                    return (
                        <VictoryScatter
                            key={index}
                            style={{ data: { fill: trend.color } }}
                            size={3}
                            data={trend.data}
                            labels={({ datum }) => `${datum.x.toLocaleDateString()} ${datum.x.toLocaleTimeString()} - ${datum.y}`}
                            labelComponent={
                                <VictoryTooltip/>
                            }
                        />
                    )
                })}
                {trends.map((trend,index)=>{
                    return (
                        <VictoryLine
                            // interpolation="natural"
                            key={index}
                            style={{
                                // data: { stroke: "#c43a31" },
                                data: { stroke: trend.color },
                                parent: { border: "0.5px solid #ccc"}
                            }}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            // labels={({ datum }) => datum.y}
                            data={trend.data}
                        />
                    )
                })}
                </VictoryChart>
            </div> 
            : <div className={Classes.SKELETON} style={styles.skeletonContainer}></div>
    },[trends]);
    const renderLabel = useMemo(()=>{
        return(
            <div style={{ padding : 5 , width : (item.w > 2) ? 'auto' : '100%' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center' }}>
                {(trends) ?
                    trends.map((keyword,index)=>{
                        const trendChange = (keyword.data.length > 1) ? (keyword.data[keyword.data.length - 1]['y'] - keyword.data[0]['y']) / keyword.data[0]['y'] * 100 : 0
                        const dureationDays = (keyword.data.length > 1) ? (keyword.data[keyword.data.length-1].x - keyword.data[0].x)/1000/60/60/24 : 0;
                        const dureationHours = (keyword.data.length > 1) ? (keyword.data[keyword.data.length-1].x - keyword.data[0].x)/1000/60/60 : 0;
                        return(
                            <Tooltip
                                key={index} 
                                content={
                                    <div style={{ margin : 'auto' }}>
                                        <span >{ `First Updated : ${(keyword.data.length > 0) ? keyword.data[0].x.toLocaleDateString() : null}` }</span>
                                        <br></br>
                                        <span>{`Last Updated : ${(keyword.data.length > 0) ? keyword.data[keyword.data.length-1].x.toLocaleDateString() : null}`}</span>
                                        <br></br>
                                        <span>{(keyword.data.length > 0) ? `Duration: ${(dureationDays > 1) ? ~~dureationDays+" Days" : ~~dureationHours+ " Hours"}` : null }</span>
                                    </div>
                                } 
                                position={Position.TOP}
                            >
                                <Tag key={index} style={{ marginRight : 5 , minWidth : 100 , backgroundColor : '#000000' , cursor : 'pointer'}}>
                                    <Icon icon={'dot'} color={keyword.color}/>
                                    {keyword.name}
                                    <Icon icon={(trendChange > 0) ? 'caret-up' : 'caret-down'} color={(trendChange > 0) ? 'green' : 'red'}/>
                                    {`${~~trendChange}%`}
                                </Tag>
                            </Tooltip>

                        )
                    }): null
                }
            </div>
        )
    },[trends])
    const renderLiveUpdateBottom = useMemo(()=>{
        return (
          <div style={{ position : 'absolute' , bottom : 0 , right : 10 , backgroundColor : '#272C33' , padding : 5 }}>
            {(userRole !== 'owner' && filterLock == true) ? 
              <Tag style={{ backgroundColor : '#000000' }}>
                <Icon icon={'dot'} intent={(isLive === true) ? 'success' : 'danger'}/>
                {`${(isLive === true) ? 'Live' : 'Offline'} : ${updateTime.toLocaleTimeString()}`}
              </Tag> : 
              <Switch 
                onChange={()=>{ 
                    setIsLive(!isLive);
                    if(userRole === 'owner') componenetUpdate(component.id,null,null,null,!isLive);
                }} 
                checked={isLive} 
                innerLabel={'Offline'} 
                innerLabelChecked={'live'} 
                label={`Last Updated : ${updateTime.toLocaleTimeString()}`} 
                style={{ color : '#FFFFFF' , fontSize : 12 }}
              />
            }
          </div>
        )
      },[isLive,updateTime])
    const resetButton = useMemo(()=>{
        return (userRole === 'owner') ? (
            <Button loading={loading} style={{ minWidth  : 200 , position : 'fixed' , bottom : 5 , left : 5 }} icon={'chart'} text={'Reset Chart Widget'} onClick={()=>resetChart(component.id,setLoading,reload)}/>
        ) : null
    },[loading]);
    const render = useMemo(()=>{  
        console.log('Render Widget');
        return (
            <div style={{
                ...styles.mainContainer,
                overflowY : 'scroll',
                overflowX : 'none'
            }}>
                <Navbar fixedToTop={true} style={styles.headerContainer}>
                    {renderTopBarHeader}
                    {renderTopBarDateFilter}
                </Navbar>
                {renderLabel}
                {renderChart}
                {renderLiveUpdateBottom}
                {resetButton}
            </div>
        )

    },[item.w,item.h,trends,dateFilter,filterLock,isLive,updateTime,loading])
    return render;
}

const styles = {
    mainContainer : {
        height : '90%' ,
        width : '100%',
        paddingTop : 10,
        paddingBottom : 20
    },
    skeletonContainer : {
        height : '80%',
        width : '99%',
        margin : 'auto'
    },
    headerContainer : {
        paddingTop : 5,
        paddingBottom : 5,
        backgroundColor : '#272C33',
        position : 'relative'
        // height : 'auto'
    },
    header : {
        color : '#FFFFFF',
        margin : 5,
        marginLeft : 10
    }
}

export default TwitterChartWidget;