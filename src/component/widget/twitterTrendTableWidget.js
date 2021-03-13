import { useEffect , useMemo, useState , useRef } from 'react';
import { InputGroup , Icon , Classes , Navbar , Button , Checkbox , Tag , TagInput , Popover , Menu , MenuItem , Spinner , HTMLTable , Switch , Position , Drawer ,  Toaster , Toast , Alignment, FormGroup } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { DateRangeInput } from "@blueprintjs/datetime";
import { API , graphqlOperation } from 'aws-amplify';
import { AiOutlineTwitter } from 'react-icons/ai';
import { updateComponent } from '../../graphql/mutations';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
const twitterTrendByUpdatedAt = gql`
  query TwitterTrendByUpdatedAt(
    $countryID: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTwitterTrendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    twitterTrendByUpdatedAt(
      countryID: $countryID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keywordID
        duration
        countryID
        metricID
        languageID
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;

const onCreateTwitterTrend = gql`
  subscription OnCreateTwitterTrend {
    onCreateTwitterTrend {
      id
      keywordID
      duration
      countryID
      metricID
      languageID
      updatedAt
      createdAt
    }
  }
`;

const getTwitterTrend = async(setLoading,setTwitterTrends,keywords,selectCountry,dateFilter,setNextToken,nextToken,setLoadMore)=>{
  try {
    if(nextToken == null){
      setLoading(true);
      setTwitterTrends(null);
    } else {
      setLoadMore(true)
    };
    // console.log(new Date().getTimezoneOffset()*1000);
    // console.log(new Date().getTime());
    // const date = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000);
    // const dateString = `${date.getFullYear()}-${(date.getMonth()<10)? '0' : ''}${date.getMonth()+1}-${(date.getDate()<10) ? '0' : ''}${date.getDate()}`
    // const timeString = `${date.getHours()}:${(date.getMinutes()<10)? '0' : ''}${date.getMinutes()}`;
    // console.log('Date String',dateString,'Time String',timeString);
    let queryParams = {
      countryID : 'US',
      sortDirection: 'DESC',
      limit : 10
    }
    if(keywords && keywords.length > 0){
      queryParams['filter'] = {};
      queryParams['filter']['or'] = [];
      keywords.map((key)=>{
        queryParams['filter']['or'].push({ keywordID : { contains : key } });
      });
      queryParams['limit'] = 10000;
    }
    if(selectCountry) queryParams.countryID = selectCountry;
    if(dateFilter){
      console.log('Start Date : ', dateFilter[0].getDate());
      console.log('End Date : ',dateFilter[1].getDate());
      const startMonth = `${(dateFilter[0].getMonth()+1 < 10) ? 0 : ''}${dateFilter[0].getMonth()+1}`;
      const startDate = `${dateFilter[0].getFullYear()}-${startMonth}-${dateFilter[0].getDate()}T00:00:00.000Z`;
      console.log('Format Start Date,',startDate);
      const endMonth = `${(dateFilter[1].getMonth()+1 < 10) ? 0 : ''}${dateFilter[1].getMonth()+1}`;
      const endDate = `${dateFilter[1].getFullYear()}-${endMonth}-${dateFilter[1].getDate()}T00:00:00.000Z`;
      queryParams.updatedAt = { between :  [startDate,endDate] };
      queryParams.sortDirection = 'ASC';

    }
    if(nextToken) queryParams.nextToken = nextToken;
    console.log(queryParams);
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
      client.query({ 
          query: twitterTrendByUpdatedAt,
          variables : queryParams
        })
        .then(function logData(usTwitterTrend) {
            console.log('results of query: ', usTwitterTrend);
            // console.log('Twitter Trend',usTwitterTrend);
            setTwitterTrends((previoueList)=>{
              if(previoueList == null){
                return usTwitterTrend['data']['twitterTrendByUpdatedAt']['items'];
              } else {
                return previoueList.concat(usTwitterTrend['data']['twitterTrendByUpdatedAt']['items']);
              }
            })
            setNextToken(usTwitterTrend['data']['twitterTrendByUpdatedAt']['nextToken'])
            setLoading(false);
            if(nextToken) setLoadMore(false)
        })
        .catch((error)=>{
          console.log('Error',error);
          setLoading(false);
        });
    });
  } catch (error) {
    console.log('Error',error);
    setLoading(false);
  }
}

const componenetUpdate = async(componentId,countryCode,filterLock,keywords,dateRange,isLive)=>{
  let updateObj = { id : componentId };
  if(countryCode) updateObj.countryCode = countryCode;
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

const generateChart = async(componentId,keywords,setLoading,reload)=>{
  try {
    setLoading(true)
    let updateObj = { id : componentId };
    keywords = keywords.map((key)=>{
      key.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      return key
    })
    // '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    console.log('keywords Array',keywords);
    if(keywords) updateObj.keywords = JSON.stringify(keywords);
    const updateComponentToGenerateChart = await API.graphql({
      query : updateComponent,
      variables: {
        input : updateObj
      }
    });
    console.log('Update Comp. to generate Chart Res',updateComponentToGenerateChart);
    setLoading(false);
    reload();
  } catch (error) {
    console.log('Error',error);
    setLoading(false);
  }
}

const renderTableRow = (trend,index,chartMode,setSelectedChartTrends,selectedChartTrends)=>{
  // console.log('Trend Id',trend.id);
  const createdAt = new Date(trend.createdAt);
  const updatedAt = new Date(trend.updatedAt);
  const durationInMin = trend.duration/1000/60/60;
  const isSelected = selectedChartTrends.filter((item)=>item.id === trend.id).length > 0;
  return (
    <tr key={index}>
      {(chartMode === true) ? <td><Checkbox checked={isSelected} onChange={()=>{
        if(isSelected === false) setSelectedChartTrends((array)=>[{ id : trend.id , name : trend.keywordID }].concat(array));
        if(isSelected === true) setSelectedChartTrends((array)=>array.filter((item)=>item.id !== trend.id));
      }} /></td> : null}
      <td style={{color : "#FFFFFF" }}>{trend.keywordID}</td>
      <td style={{color : "#FFFFFF" }}>
        {`${createdAt.getUTCFullYear()}-${(createdAt.getUTCMonth()+1 < 10 )?0:''}${createdAt.getUTCMonth()+1}-${(createdAt.getUTCDate()<10)?0:''}${createdAt.getUTCDate()} ${(createdAt.getHours()<10)?'0':''}${createdAt.getHours()}:${(createdAt.getUTCMinutes()<10)?'0':''}${createdAt.getUTCMinutes()}`}
      </td>
      <td style={{color : "#FFFFFF" }}>
        {`${updatedAt.getUTCFullYear()}-${(updatedAt.getUTCMonth()+1 < 10 )?0:''}${updatedAt.getUTCMonth()+1}-${(updatedAt.getUTCDate()<10)?0:''}${updatedAt.getUTCDate()} ${(updatedAt.getHours()<10)?'0':''}${updatedAt.getHours()}:${(updatedAt.getUTCMinutes()<10)?'0':''}${updatedAt.getUTCMinutes()}`}
      </td>
      <td style={{color : "#FFFFFF" }}>{`${durationInMin.toFixed(0)} mins`}</td>
    </tr>
  )
}

const Countries = { 
  items :[
    { name : '🌐 Global' , countryCode : 'GLOBAL' },
    { name : '🇺🇸 United States' , countryCode : 'US' },
    { name : '🇬🇧 United Kingdom' , countryCode : 'GB' },
    { name : '🇨🇦 Canada' , countryCode : 'CA' },
    { name : '🇯🇵 Japan' , countryCode : 'JP' },
    { name : '🇰🇷 Korea' , countryCode : 'KR' },
    { name : '🇸🇬 Singapore' , countryCode : 'SG' }
  ],
  itemListRenderer : ({ items, itemsParentRef, query, renderItem , filteredItems })=>{
    const renderedItems = filteredItems.map(renderItem).filter(item => item != null);
    return (
      <Menu ulRef={itemsParentRef} style={{ maxHeight : 200 , overflow : 'scroll' }}>
          {renderedItems}
      </Menu>
    );
  },
  onItemSelect : (item)=>{
    console.log(item);
    return <MenuItem text={'selected'}/>
  }
}

function TwitterTrendTable({item,userRole,chartMode,reload,setError,setDragEnable}){
    // console.log(item);
    const { component } = item
    const [twitterTrends,setTwitterTrends] = useState(null);
    const [keywords,setKeywords] = useState((component.keywords) ? JSON.parse(component.keywords) : []);
    const [selectCountry,setSelectCountry] = useState((component.countryCode) ? Countries.items.filter((item)=>item.countryCode == component.countryCode)[0] : Countries.items[1]);
    const [loading,setLoading] = useState(false);
    const [loadMore,setLoadMore] = useState(false);
    const [dateFilter,setDateFilter] = useState((component.dateFilterStart && component.dateFilterEnd) ? [new Date(component.dateFilterStart),new Date(component.dateFilterEnd)] : null);
    const [nextToken,setNextToken] = useState(null);
    const [filterLock,setFilterLock] = useState((component.filterLock) ? component.filterLock : false);
    const [update,setUpdate] = useState(null);
    const [updateTime,setUpdateTime] = useState(new Date());
    const [isLive,setIsLive] = useState((chartMode === true) ? false : (component.isLive) ? component.isLive : false );
    const [selectedChartTrends,setSelectedChartTrends] = useState([]);
    const lastKeywords = useRef();
    const lastCountry = useRef();
    const lastDate = useRef();
    useEffect(()=>{
      lastKeywords.current = keywords;
      lastCountry.current = selectCountry;
      lastDate.current = dateFilter;
      getTwitterTrend(setLoading,setTwitterTrends,keywords,selectCountry.countryCode,dateFilter,setNextToken,null);
    },[keywords,selectCountry,dateFilter]);
    useEffect(()=>{
      if(update === false && isLive === true) {
        console.log('Last Params : ',lastKeywords.current,lastCountry.current,lastDate.current);
        setUpdateTime(new Date());
        getTwitterTrend(setLoading,setTwitterTrends,lastKeywords.current,lastCountry.current.countryCode,lastDate.current,setNextToken,null);
        setUpdate(false);
      }
    },[update,isLive])
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
        const observable = client.subscribe({ query: onCreateTwitterTrend });
        // const realtimeResults = function realtimeResults(data) {
        //     console.log('realtime data: ', data);
        // };
        observable.subscribe({
            next: (data) => { 
              // console.log('Realtime Update : ',data);
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
      // const subscription = API.graphql(
      //     graphqlOperation(onCreateTwitterTrend)
      // ).subscribe({
      //     next: ({ provider, value }) => { 
      //       // console.log({ provider, value });
      //       setUpdate(true);
      //     },
      //     error: error => {
      //       console.warn('Subscription Error : ',error);
      //       setError({ message :'Disconnected. Please reload the page to enable real time updates.' , timeout : 100000 });
      //     },
      //     close: () =>{
      //       console.warn('Subscription Close');
      //     }
      // });
      // return ()=>observable.unsubscribe();

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
    const renderLoadMore = useMemo(()=>{
      return <div style={styles.loadMoreContainer}>{(loadMore === true) ? <Spinner size={15}/> : null}</div>
    },[loadMore])
    const renderTrendTable = useMemo(()=>{
      console.log('Render Table', twitterTrends, loading);
      return (twitterTrends && loading == false) ? 
          <HTMLTable style={{ width : '100%' , padding : 10, paddingBottom : 20 , position : 'relative' , top : 110 }}>
            <thead>
                <tr>
                  {(chartMode ===true) ? <th></th> : null}
                  <th style={styles.tableHeader}>Keyword</th>
                  <th style={styles.tableHeader}>Create</th>
                  <th style={styles.tableHeader}>Last Update</th>
                  <th style={styles.tableHeader}>Duration</th>
                </tr>
            </thead>
            <tbody style={{ borderColor : '#FFFFFF' , borderWidth : 1 , borderStyle : 'solid' }}>
                {twitterTrends.map((trend,index)=>renderTableRow(trend,index,chartMode,setSelectedChartTrends,selectedChartTrends))}
            </tbody>
          </HTMLTable>
          : <div className={Classes.SKELETON} style={styles.skeletonContainer}></div>
    },[twitterTrends,loading,selectedChartTrends]);
    const renderTopBarHeader = useMemo(()=>{
      return(
        <Navbar.Group align={"left"} style={{ width : (item.w > 4) ? '50%' : '100%' }}>
          {(userRole === 'owner' && chartMode == false) ? <Button icon={(filterLock === true) ? 'lock' : 'unlock'} minimal={true} style={{ marginRight : (item.w > 6) ? 20 : 5  }} 
            onClick={()=>{ 
              componenetUpdate(component.id,null,!filterLock);
              setFilterLock(!filterLock);
          }}/> : null}
          <div style={{ backgroundColor : '#32A3FC' , fontWeight : 'bold' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center' , padding : '5px 10px' , borderRadius : 50 }}>
            <AiOutlineTwitter color={'#FFFFFF'} style={{ marginRight : 5 }}/>
            <h4 style={{ margin : 0 , color : '#FFFFFF' }}>{'Twitter'}</h4>
          </div>
          <h2 style={styles.header}>{'Recent Trend'}</h2>
        </Navbar.Group>
      )
    },[filterLock])
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
                componenetUpdate(component.id,null,null,null,null,!isLive);
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
    const renderKeywordFilter = useMemo(()=>{
      return(
        <Navbar.Group align={"right"} style={{ width : '50%' , display : 'flex' , flexDirection : 'row', alignItems : 'center' , justifyContent : 'flex-end' }}>
          {(userRole !== 'owner' && filterLock == true) ?
            keywords.map((key,index)=><Tag key={index} style={{ marginRight : 10 }}>{key}</Tag>) : 
            <TagInput
              fill={true}
              onAdd={(values)=>{
                console.log(values);
                setKeywords((originKeyList)=>{
                  const newKeywords = originKeyList.concat(values);
                  if(userRole === 'owner' && chartMode == false) componenetUpdate(component.id,null,null,newKeywords);
                  return newKeywords;
                });
              }}
              onRemove={(nodes,index)=>{
                console.log(index);
                setKeywords((originKeyList)=>{
                  const newKeywords = originKeyList.filter((key,keyIndex)=>keyIndex !== index);
                  if(userRole === 'owner' && chartMode == false) componenetUpdate(component.id,null,null,newKeywords);
                  return newKeywords;
                });
              }}
              leftIcon="search"
              placeholder="Search a Twitter trend with a Keyword ..." 
              values={keywords.map((key,index)=><Tag key={index}>{key}</Tag>)}
            />
          }
        </Navbar.Group>
      )
    },[keywords])
    const renderSelectedChartTag = useMemo(()=>{
      return(
        <div style={{ bottom : 0 , right : 10 , backgroundColor : '#182026' , padding : 5 , position : 'absolute' , maxWidth : '70%' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'flex-end' }}>
          <div style={{ overflowX : 'scroll' , display : 'flex' , flexDirection : 'row' , padding : 2 }}>{selectedChartTrends.map((trend,index)=><Tag style={{ marginRight : 5 , minWidth  : 100 }} key={index} onRemove={()=>setSelectedChartTrends((array)=>array.filter((item)=>item.id !== trend.id))}>{trend.name}</Tag>)}</div>
          <Button loading={loading} style={{ minWidth  : 200 }} icon={'chart'} text={'Create a Chart Widget'} onClick={()=>generateChart(component.id,selectedChartTrends,setLoading,reload)}/>
        </div>
      )
    },[selectedChartTrends,loading])
    const renderDateFilter = useMemo(()=>{
      return(
        <Navbar.Group align={'right'}>
        {(userRole !== 'owner' && filterLock == true) ? 
          (dateFilter != null) ? <Tag>{`Last Updated : ${dateFilter[0].toDateString()} - ${dateFilter[1].toDateString()}`}</Tag> : null
           : <FormGroup label={'Last Update'} style={{ color : '#FFFFFF' , fontWeight : 'bold' }} inline={true}>
              <DateRangeInput
                popoverProps={{ canEscapeKeyClose : true }}
                // fill={true}
                formatDate={date => date.toLocaleDateString()}
                onChange={(dateRange)=>{
                  console.log(dateRange);
                  if(dateRange[0] && dateRange[1]) {
                    setDateFilter(dateRange);
                    if(userRole === 'owner' && chartMode == false) componenetUpdate(component.id,null,null,null,dateRange);
                  } else {
                    setDateFilter(null);
                    if(userRole === 'owner' && chartMode == false) componenetUpdate(component.id,null,null,null);
                  };
                }}
                parseDate={str => new Date(str)}
                value={(dateFilter != null) ? [dateFilter[0], dateFilter[1]] : []}
            />  
            {(dateFilter) ? <Button icon={'cross'} minimal={true} onClick={()=>{
              setDateFilter(null);
              if(userRole === 'owner'&& chartMode == false ) componenetUpdate(component.id,null,null,null);
            }}/> : null}
          </FormGroup>}
        </Navbar.Group>
      )
    },[dateFilter])
    const renderCountryFilter = useMemo(()=>{
      return(
        <Navbar.Group align={'left'}>
            <Select
                disabled={(userRole !== 'owner' && filterLock == true)}
                fill={true}
                items={Countries.items}
                itemPredicate={(query,item)=>item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0}
                itemRenderer={(item,{ handleClick ,modifiers })=>{
                  // console.log(item);
                  return <MenuItem key={item.countryCode} style={{ 
                    backgroundColor : (selectCountry.countryCode == item.countryCode) ? '#B1B1B1' : ''
                  }} text={`${item.name}`} active={modifiers.active} onClick={handleClick} query={item.title}/>
                }}
                itemListRenderer={Countries.itemListRenderer}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={(item)=>{
                  console.log(item);
                  console.log('Set Select Country',item);
                  setSelectCountry(item);
                  if(userRole === 'owner' && chartMode == false) componenetUpdate(component.id,item.countryCode);
                }}
                inputProps={{ style : { marginTop : 2 , width : '98%' , marginLeft : '1%' , marginRight : '1%' } , placeholder : 'Search a country...' }}
              >
                  {(userRole !== 'owner' && filterLock == true) ? <Tag>{selectCountry.name}</Tag> : <Button fill={true} text={selectCountry.name} rightIcon="chevron-down" style={{ marginRight : 5 }}/>}
              </Select>
          </Navbar.Group>
      )
    },[selectCountry]);
    const render = useMemo(()=>{
      console.log('Render');
      return(
        <div 
          style={styles.mainContainer} 
          onScroll={(e)=>{
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if(bottom && nextToken && loadMore == false) {
              // console.log('Reach Bottom');
              getTwitterTrend(setLoading,setTwitterTrends,keywords,selectCountry.countryCode,dateFilter,setNextToken,nextToken,setLoadMore);
            }
          }}>
          <Navbar fixedToTop={true} style={styles.headerContainer}>
            {renderTopBarHeader}
            {renderKeywordFilter}
            {renderCountryFilter}
            {renderDateFilter}
          </Navbar>
          {renderTrendTable}
          {renderLoadMore}
          {(chartMode === false) ?
            renderLiveUpdateBottom :
            renderSelectedChartTag
          }
        </div>
      )
    },[twitterTrends,loading,loadMore,filterLock,isLive,updateTime,dateFilter,selectCountry,keywords,selectedChartTrends]);
    return render;
}

const styles = {
    mainContainer : {
        height : '100%' ,
        width : '100%',
        paddingBottom : 20,
        overflowY : 'scroll',
        overflowX : 'hidden'
    },
    headerContainer : {
        paddingTop : 20,
        backgroundColor : '#272C33',
        height : 'auto'
    },
    header : {
      color : '#FFFFFF',
      margin : 5,
      marginLeft : 10
    },
    skeletonContainer : {
        height : '100%',
        width : '98%',
        margin : 'auto'
    },
    tableHeader : {
      color : "#FFFFFF" , 
      borderColor : '#FFFFFF' , 
      borderStyle : 'solid' , 
      borderBottomWidth : 0.5 , 
      borderTopWidth : 0 , 
      borderRightWidth : 0 , 
      borderLeftWidth : 0 
    },
    loadMoreContainer : {
      width : '100%',
      position : 'absolute',
      bottom : 0,
      margin : 5
    }
}

export default TwitterTrendTable;