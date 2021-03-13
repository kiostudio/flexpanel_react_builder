import { useEffect , useState , useMemo } from 'react';
import { Icon , InputGroup , Card, Button , ButtonGroup , FocusStyleManager , Popover , Menu , MenuItem , Spinner , HTMLTable , Position , Drawer ,  Toaster , Toast , Dialog } from "@blueprintjs/core";
import { API } from 'aws-amplify';
import { Select } from "@blueprintjs/select";
import { updateComponent} from '../../graphql/mutations';
import moment from "moment-timezone";

const updateComponentRequest = async(id,timezone)=>{
    try {
        let updateObj = { id : id };
        if(timezone) updateObj.displayTimeZone = timezone;
        const updateTimezoneRequest = await API.graphql({
            query : updateComponent,
            variables: {
                input : updateObj
            }
        });
        console.log('Timezone Update Res :',updateTimezoneRequest);
        
    } catch (error) {
        console.log('Error in Date time Widget',error);
    }
}

function DateTimeWidget({grid,userRole}){
    // console.log('Date Time Widget',item.component);
    const [date,setDate] = useState(new Date());
    const [timezone,setTimezone] = useState((grid.component.displayTimeZone) ? grid.component.displayTimeZone : moment.tz.guess());
    const [timezoneList,setTimezoneList] = useState(moment.tz.names());
    useEffect(()=>{
        const timerID = setInterval( () => setDate(new Date()), 1000 );
        return ()=>{
            clearInterval(timerID);
        }
    });
    let hourNum = date.toLocaleTimeString('en-US',(timezone) ? { timeZone : timezone , hour12: false } : { timeZone: moment.tz.guess() , hour12: false }).split(':')[0];
    if(hourNum[0] === 0) hourNum.replace(0,'')
    const isNightTime = (hourNum > 17 || 6 > hourNum);
    const renderTimezoneFilter = useMemo(()=>{
        return(
            <Select
                disabled={!(userRole === 'owner')}
                fill={true}
                items={timezoneList}
                itemPredicate={(query,item)=>item.toLowerCase().indexOf(query.toLowerCase()) >= 0}
                itemRenderer={(item,{ handleClick ,modifiers })=>{
                // console.log(item);
                return <MenuItem key={item} style={{ 
                    backgroundColor : (item == timezone) ? '#B1B1B1' : ''
                }} text={`${item}`} active={modifiers.active} onClick={handleClick} query={item}/>
                }}
                itemListRenderer={({ items, itemsParentRef, query, renderItem , filteredItems })=>{
                const renderedItems = filteredItems.map(renderItem).filter(item => item != null);
                return (
                    <Menu ulRef={itemsParentRef} style={{ maxHeight : 200 , overflow : 'scroll' }}>
                        {renderedItems}
                    </Menu>
                );
                }}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={(item)=>{
                    updateComponentRequest(grid.component.id,item)
                    setTimezone(item)
                }}
                inputProps={{ style : { marginTop : 2 , width : '98%' , marginLeft : '1%' , marginRight : '1%' } , placeholder : 'Search a Timezone...' }}
            >
                <Button fill={true} text={`${(grid.w > 2) ? timezone : ''} ${moment().tz(timezone).format('Z')}`} rightIcon={(userRole === 'owner') ? "chevron-down" : "globe"}/>
            </Select>
        )
      },[grid.w,timezone]);
    return(
        <div style={styles.mainContainer}>
            <h2 style={styles.header}>{date.toLocaleDateString('en-US',(timezone) ? { timeZone : timezone } : { timeZone: moment.tz.guess() })}</h2>
            <h1 style={styles.header}>
                <Icon color={(isNightTime === true) ? "#34495e" : "#f1c40f"} icon={(isNightTime === true) ? 'moon' : 'flash'} iconSize={18} style={{  marginRight : 10 }}/>
                {date.toLocaleTimeString('en-US',(timezone) ? { timeZone : timezone , hour12: false } : { timeZone: moment.tz.guess() , hour12: false})}
            </h1>
            {renderTimezoneFilter}
        </div>
    )
}

const styles = {
    mainContainer : {
        display : 'flex',
        flex : 1,
        alignSelf : 'stretch',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
        // backgroundColor : 'red'
    },
    header : {
        color : '#FFFFFF',
        margin : 5,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}

export default DateTimeWidget;