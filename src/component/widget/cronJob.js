import { useEffect , useMemo, useState } from 'react';
import { API , graphqlOperation, Storage } from 'aws-amplify';
import { Alert , InputGroup , Icon , NonIdealState , Classes , Navbar , Button , ButtonGroup , Tag , TagInput , Dialog , Menu , MenuItem , Spinner , HTMLTable , Switch , Position , Drawer ,  Toaster , Toast , Alignment, FormGroup } from "@blueprintjs/core";
import { jobByComponenetId , getTwitterOAuth } from '../../graphql/queries';
import { deleteCronJob , updateCronJob } from '../../graphql/mutations';
import CronJobDialog from './cronJobDialog';
import CronJobMetricDialog from './cronJobMetricDialog';
import { onUpdateCronJob } from '../../graphql/subscriptions';
import { AiOutlineTwitter } from 'react-icons/ai';

const getJobsListRequest = async(componentID,setJobsList,setLoading,setNextToken,nextToken,setLoadMore)=>{
    try {
        let queryObj = {
            componentID: componentID,
            sortDirection : 'DESC',
            limit : 10
        }
        if(nextToken !== undefined && nextToken !== null) queryObj.nextToken = nextToken;
        (nextToken !== undefined && nextToken !== null) ? setLoadMore(true) : setLoading(true);
        const getJobListRequest = await API.graphql({
            query : jobByComponenetId,
            variables: queryObj
        });
        console.log('Job List Request : ',getJobListRequest);
        setNextToken(getJobListRequest.data.jobByComponenetID.nextToken)
        if(getJobListRequest.data.jobByComponenetID.items.length > 0){
            await Promise.all(
                getJobListRequest.data.jobByComponenetID.items.map(async(job)=>{
                    const getTwitterOAuthRequest = await API.graphql({
                        query : getTwitterOAuth,
                        variables: {
                            id : job.twitterOAuthID
                        }
                    });
                    job.profile_screen_name = getTwitterOAuthRequest.data.getTwitterOAuth['screen_name'];
                    return job;
                })
            )
            .then((res)=>{
                console.log('Response All Profile : ',res);
                (nextToken !== undefined && nextToken !== null) ? setJobsList((originList)=>originList.concat(res)) : setJobsList(res);
                (nextToken !== undefined && nextToken !== null) ? setLoadMore(false) : setLoading(false);
            })
            .catch((error)=>{
                console.log("Error :",error);
                setLoading(false);
                (nextToken !== undefined && nextToken !== null) ? setLoadMore(false) : setLoading(false);
            })
        } else {
            setJobsList(getJobListRequest.data.jobByComponenetID.items);
            setLoading(false);
            (nextToken !== undefined && nextToken !== null) ? setLoadMore(false) : setLoading(false);
        }
    } catch (error) {
        console.log("Error :",error);
        setLoading(false);
        (nextToken !== undefined && nextToken !== null) ? setLoadMore(false) : setLoading(false);
    }
}

const deleteJobRequest = async(setLoading,jobID,setDeleteDialog,setDeletedJob)=>{
    try {
        setLoading(true);
        const requestToUpdateCronJob = await API.graphql({
            query : updateCronJob,
            variables: {
                input : {
                    id : jobID,
                    status : "delete_request"
                }
            }
        });
        console.log('Update Cron Job Result',requestToUpdateCronJob);
        setLoading(false);
        setDeleteDialog(false);
        setDeletedJob(null);
        // reload();
    } catch (error) {
        console.log("Error :",error);
        setLoading(false);
    }
}

const jobToTrash = async(setLoading,jobID,setDeleteDialog,setDeletedJob,reload)=>{
    try {
        setLoading(true);
        const deleteCronJobRequest = await API.graphql({
            query : deleteCronJob,
            variables: {
                input : {
                    id : jobID
                }
            }
        });
        console.log('Delete Cron Job Request',deleteCronJobRequest);
        setLoading(false);
        setDeleteDialog(false);
        setDeletedJob(null);
        reload();
    } catch (error) {
        console.log("Error :",error);
        setLoading(false);
    }
}

const renderTableRow = (job,index,setDeleteDialog,setDeletedJob,setEditJob,setDialogOpen,setMetricJob,setMetricDialog)=>{
    const createdAt = new Date(job.createdAt);
    const updatedAt = new Date(job.updatedAt);
    const scheduleAt = new Date(job.scheduleTime);
    const jobStatusColor = ()=>{
        switch(job.status){
            case "pending":
                return "warning"
            case "success":
                return "success"
            case "fail":
                return "danger"
            case "deleted":
                return "danger"
            default:
                return "none"
        }
    }
    return(
        <tr key={index}>
            <td style={{color : "#FFFFFF" }}>
                {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
                {/* {`${createdAt.getUTCFullYear()}-${(createdAt.getUTCMonth()+1 < 10 )?0:''}${createdAt.getUTCMonth()+1}-${(createdAt.getUTCDate()<10)?0:''}${createdAt.getUTCDate()} ${(createdAt.getHours()<10)?'0':''}${createdAt.getHours()}:${(createdAt.getUTCMinutes()<10)?'0':''}${createdAt.getUTCMinutes()}`} */}
            </td>
            <td style={{color : "#FFFFFF" }}>
                {updatedAt.toLocaleDateString()} {updatedAt.toLocaleTimeString()}
            </td>
            <td style={{color : "#FFFFFF" , display : 'flex' , flexDirection : 'row' , overflow : 'scroll' , maxWidth :200 }}>
                {(job.action.includes('post') === true) ?
                    <div style={{ backgroundColor : '#0f9960' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center' , padding : '5px' , borderRadius : 20 }}>
                        <span style={{color : "#FFFFFF" , fontSize : 12 }}>{'Post'}</span>     
                    </div>
                : null}
                {(job.action.includes('Twitter') === true) ?
                <div style={{ margin : '0px 5px', backgroundColor : '#32A3FC' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center' , padding : '5px' , borderRadius : 20 }}>
                    <AiOutlineTwitter color={'#FFFFFF'} style={{ marginRight : 5 }}/>
                    <span style={{color : "#FFFFFF" , fontSize : 12  }}>{'Twitter'}</span> 
                </div>
                : null}
            </td>
            <td style={{color : "#FFFFFF" }}>
                {scheduleAt.toLocaleDateString()} {scheduleAt.toLocaleTimeString()}
            </td>
            <td>
                <Tag intent={'none'}>{`@${job.profile_screen_name}`}</Tag>
            </td>
            <td>
                <Tag intent={jobStatusColor()}>{`${job.status}`}</Tag>
            </td>
            <td>
                <ButtonGroup>
                    <Button disabled={job.status == 'pending'} style={{ color : (job.status == 'pending') ? "grey" : "#FFFFFF" }} minimal={true} text={'Metric'} icon={'chart'} intent={'primary'}
                        onClick={()=>{
                            setMetricJob(job);
                            setMetricDialog(true);
                        }}
                    />
                    <Button disabled={job.status == 'deleted' || job.status == 'delete_request'} style={{ color : (job.status == 'deleted' || job.status == 'delete_request') ? "grey" : "#FFFFFF" }} minimal={true} intent={'danger'} text={'Delete'} icon={'trash'} onClick={()=>{
                        setDeletedJob(job);
                        setDeleteDialog(true);
                    }}/>
                    <Button disabled={job.status !== 'pending'} style={{ color : (job.status !== 'pending') ? "grey" : "#FFFFFF" }} minimal={true} intent={'primary'} text={'Edit'} icon={'edit'} 
                        onClick={async()=>{
                            console.log('Set Edit',job.media);
                            if(job.media && !job.media.includes('https://')){
                                const newImage = await Storage.get(job.media, { level: 'public' });
                                job.mediaPreview = newImage;
                            }
                            setEditJob(job);
                            setDialogOpen(true);
                        }}
                    />
                </ButtonGroup>
            </td>
      </tr>
    )
}

function CronJobBoard({item,userRole,userID,setDragEnable}){
    const [loading,setLoading] = useState(true);
    const [dialogLoading,setDialogLoading] = useState(false);
    const [jobsList,setJobsList] = useState(null);
    const [nextToken,setNextToken] = useState(null);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [metricDialog,setMetricDialog] = useState(false);
    const [metricJob,setMetricJob] = useState(false);
    const [deletedJob,setDeletedJob] = useState(null);
    const [editJob,setEditJob] = useState(null);
    const [loadMore,setLoadMore] = useState(false);
    useEffect(()=>{
        getJobsListRequest(item.component.id,setJobsList,setLoading,setNextToken)
    },[]);
    useEffect(()=>{
        const subscription = API.graphql(
           graphqlOperation(onUpdateCronJob)
       ).subscribe({
           next: ({ provider, value }) => {
            console.log('Updated Job',value);
            setJobsList((jobList)=>{
                jobList = jobList.map((job)=>{
                    // console.log('Job Ids',job.id,value.data.onUpdateCronJob.id);
                    if(job.id == value.data.onUpdateCronJob.id){
                        job.status = value.data.onUpdateCronJob.status;
                        job.contentID = value.data.onUpdateCronJob.contentID;
                    }
                    return job;
                })
                return jobList;
            })
           },
           error: error => {
             console.warn('Subscription Error : ',error);
           },
           close: () =>{
             console.warn('Subscription Close');
           }
       });
       return ()=>subscription.unsubscribe();
     },[]);
    const renderJobsTable = useMemo(()=>{
        return (loading == false) ? 
            (jobsList.length > 0) ?
            <HTMLTable style={{ width : '100%' , padding : 10, paddingBottom : 20 , position : 'relative' , top : 50 }}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Create</th>
                        <th style={styles.tableHeader}>Last Update</th>
                        <th style={styles.tableHeader}>Action</th>
                        <th style={styles.tableHeader}>Schedule Time</th>
                        <th style={styles.tableHeader}>Profile</th>
                        <th style={styles.tableHeader}>Status</th>
                        <th style={styles.tableHeader}></th>
                    </tr>
                </thead>
                <tbody style={{ borderColor : '#FFFFFF' , borderWidth : 1 , borderStyle : 'solid' }}>
                    {jobsList.map((job,index)=>renderTableRow(job,index,setDeleteDialog,setDeletedJob,setEditJob,setDialogOpen,setMetricJob,setMetricDialog))}
                </tbody>
            </HTMLTable> :
            <NonIdealState 
                children={
                    <div style={styles.noIdealContainer}>
                        <h2 style={{ color : '#FFFFFF' }}>{'No Jobs are Avalaible'}</h2>
                    </div>
                }
            /> 
            : <div className={Classes.SKELETON} style={styles.skeletonContainer}></div>
    },[loading,jobsList]);
    const renderTopBarHeader = useMemo(()=>{
        return(
            <Navbar.Group align={"left"} style={{ width : (item.w > 4) ? '50%' : '100%' , zIndex : 10}}>
                <Icon icon={'calendar'} color={'#FFFFFF'}/>
                <h2 style={styles.header}>{'Job Schedule'}</h2>
            </Navbar.Group>
        )
    },[])
    const renderJobCreationButton = useMemo(()=>{
        return(
          <div style={{ backgroundColor : '#272C33', zIndex : 10, bottom : 0 , right : 10 , padding : 10 , position : 'absolute' , maxWidth : '70%' , display : 'flex' , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'flex-end' }}>
            <Button intent={'primary'} loading={loading} style={{ minWidth  : 200 }} icon={'plus'} text={'Create a New Job'} onClick={()=>{
                setDialogOpen(true); 
            }}/>
          </div>
        )
    },[loading])
    const renderJobDialog = useMemo(()=>{
        return(
            <Dialog
                isOpen={dialogOpen}
                onClose={()=>{
                    setEditJob(null);
                    if(dialogLoading == false){
                        setDialogOpen(false); 
                    };
                }}
                style={styles.dialogContainer}
            >
                {(dialogOpen == true) ? <CronJobDialog editJob={editJob} setLoading={setDialogLoading} loading={dialogLoading} reload={()=>getJobsListRequest(item.component.id,setJobsList,setLoading)} setDialogOpen={setDialogOpen} userID={userID} componentID={item.component.id}/> : null}
            </Dialog>
        )
    },[loading,dialogOpen,dialogLoading,editJob])
    const DeleteDialog = useMemo(()=>{
        let deleteTargetString = 'Job';
        if(deletedJob !== null && deletedJob.status === "success") deleteTargetString = 'Tweet';
        return(
            <Alert
                isOpen={deleteDialog}
                onClose={()=>{
                    setDeleteDialog(false);
                    setDeletedJob(null);
                }}
                canOutsideClickCancel={true}
                canEscapeKeyCancel={true}
                cancelButtonText={'Cancel'}
                confirmButtonText={'Confirm Delete'}
                intent={'danger'}
                onConfirm={()=>{
                    if(deletedJob.status === "deleted" || deletedJob.status === "fail" || deletedJob.status === "pending") jobToTrash(setLoading,deletedJob.id,setDeleteDialog,setDeletedJob,()=>getJobsListRequest(item.component.id,setJobsList,setLoading));
                    if(deletedJob.status === "success") deleteJobRequest(setLoading,deletedJob.id,setDeleteDialog,setDeletedJob);
                }}
                icon={'trash'}
                style={{ maxWidth : '95%' }}
            >
                <p>{`Are you sure you want to delete the ${deleteTargetString} ? You WON"T be able to restore it later.`}</p>
            </Alert>
        )
    },[deleteDialog,loading,deletedJob])
    const MetricDialog = useMemo(()=>{
        return (
            <Dialog
                isOpen={metricDialog}
                onClose={()=>{
                    setMetricJob(null);
                    setMetricDialog(false); 
                }}
                style={styles.dialogContainer}
            >
                {(metricDialog == true) ? <CronJobMetricDialog metricJob={metricJob} setMetricDialog={setMetricDialog}/> : null}
            </Dialog>
        )
    },[metricDialog,metricJob]);
    const renderLoadMore = useMemo(()=>{
        return <div style={styles.loadMoreContainer}>{(loadMore === true) ? <Spinner size={15}/> : null}</div>
    },[loadMore])
    return (userRole === 'owner') ? (
        <div 
            style={styles.mainContainer}
            onScroll={(e)=>{
                const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                if(bottom && nextToken && nextToken !== null && loadMore == false) {
                    getJobsListRequest(item.component.id,setJobsList,setLoading,setNextToken,nextToken,setLoadMore)
                }
            }}
        >
            <Navbar fixedToTop={true} style={styles.headerContainer}>
                {renderTopBarHeader}
            </Navbar>
            {renderJobDialog}
            {renderJobsTable}
            {renderLoadMore}
            {renderJobCreationButton}
            {DeleteDialog}
            {MetricDialog}
        </div>
    ) : <h2 style={{ color : '#FFFFFF' }}>{'This is a Private Widget'}</h2>
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
        paddingTop : 10,
        paddingBottom : 5,
        backgroundColor : '#272C33',
        height : 'auto'
    },
    header : {
      color : '#FFFFFF',
      margin : 5,
      marginLeft : 10
    },
    skeletonContainer : {
        height : '95%',
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
    },
    dialogContainer: {
        backgroundColor : '#30404D',
    },
    loadMoreContainer : {
        width : '100%',
        position : 'absolute',
        bottom : 0,
        margin : 5
    }
}

export default CronJobBoard;