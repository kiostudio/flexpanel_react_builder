import { useEffect , useState , useMemo } from 'react';
import { API , Storage } from 'aws-amplify';
import { Button , TextArea , ButtonGroup , HTMLSelect , Menu , MenuItem , Spinner , Position , FormGroup , InputGroup , Switch , Classes , Tabs , Tab , Callout , Tag , FileInput, ProgressBar , Toaster , Toast } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { listTwitterOAuths } from '../../graphql/queries';
import { createCronJob , updateCronJob } from '../../graphql/mutations';
import Compressor from 'compressorjs';

const uploadPostMedia = async(jobID,mediaFile,setLoading,setDialogOpen,reload,setUploadProgress)=>{
    try {
        new Compressor(mediaFile, {
            quality: 1,
            width: 512,
            success(result) {
                console.log(result);
                // console.log()
                Storage.put(`${jobID}-media.png`, result , {
                    progressCallback(progress) {
                        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                        setUploadProgress(progress.loaded/progress.total);
                    }
                })
                .then (async(result) => {
                    console.log(result);
                    const requestToUpdateCronJob = await API.graphql({
                        query : updateCronJob,
                        variables: {
                            input : {
                                id : jobID,
                                media : result.key
                            }
                        }
                    });
                    console.log('Update Cron Job Result',requestToUpdateCronJob);
                    setLoading(false);
                    setDialogOpen(false);
                    reload();
                })
                .catch(err => {
                    console.log(err)
                    setError({ message :'Fail update the panel logo. Please reload again.'});
                    setLoading(false);
                });
            },
            error(err) {
                console.log(err.message);
                setError({ message :'Fail update the panel logo. Please reload again.'});
                setLoading(false);
            },
            });
    } catch (error) {
        console.log('Error : ',error);
        setError(error);
        setLoading(false);
    }
}

const createJobRequest = async(setLoading,selectAction,twitterPorfiles,scheduleTime,userID,textContent,mediaFile,track,setUploadProgress,setError,componentID,setDialogOpen,reload)=>{
    try {
        setLoading(true);
        if(selectAction == null || selectAction == undefined) throw new Error('Please select a job action.')
        if(twitterPorfiles == null || twitterPorfiles == undefined) throw new Error('Please select a profile.')
        if(scheduleTime == null || scheduleTime == undefined) throw new Error('Please select a schedule time.')
        console.log(scheduleTime.getTime() - new Date().getTime());
        if(new Date().getTime() > scheduleTime.getTime()) throw new Error('Schedule time is not valid. Please select a future time.')
        // if((scheduleTime.getTime() - new Date().getTime()) < 1 * 5 * 60 * 1000) throw new Error('Schedule time is too close, please make sure the job is executed at least 5 mins later from now.')
        if(textContent == null) throw new Error('Please write some text message.')
        const createCronJobRequest = await API.graphql({
            query : createCronJob,
            variables: {
                input : {
                    action: selectAction,
                    userID: userID,
                    componentID: componentID,
                    status: 'pending',
                    scheduleTime: scheduleTime,
                    twitterOAuthID: twitterPorfiles,
                    text: textContent,
                    track: track
                }
            }
        });
        console.log('Create Job Request Res :',createCronJobRequest);
        if(mediaFile){
            uploadPostMedia(createCronJobRequest.data.createCronJob.id,mediaFile,setLoading,setDialogOpen,reload,setUploadProgress)
        } else {
            setLoading(false);
            setDialogOpen(false);
            reload();
        }
    } catch (error) {
        console.log('Error : ',error);
        setError(error);
        setLoading(false);
    }
}

const updateJobRequest = async(editJob,setLoading,scheduleTime,textContent,mediaFile,track,setUploadProgress,setError,setDialogOpen,reload)=>{
    try {
        setLoading(true);
        let cronJobObj = editJob;
        if(scheduleTime == null || scheduleTime == undefined) throw new Error('Please select a schedule time.')
        console.log(scheduleTime.getTime() - new Date().getTime());
        if(new Date().getTime() > scheduleTime.getTime()) throw new Error('Schedule time is not valid. Please select a future time.')
        // if((scheduleTime.getTime() - new Date().getTime()) < 1 * 5 * 60 * 1000) throw new Error('Schedule time is too close, please make sure the job is executed at least 5 mins later from now.')
        if(textContent == null || textContent.length == 0) throw new Error('Please write some text message.')
        if(editJob.text !== textContent) editJob.text = textContent;
        if(editJob.track !== track) editJob.track = track;
        if(editJob.scheduleTime !== scheduleTime) editJob.scheduleTime = scheduleTime;
        delete editJob.profile_screen_name;
        delete editJob.mediaPreview;
        const requestToUpdateCronJob = await API.graphql({
            query : updateCronJob,
            variables: {
                input : editJob
            }
        });
        console.log('Update Cron Job Result',requestToUpdateCronJob);
        if(mediaFile){
            uploadPostMedia(editJob.id,mediaFile,setLoading,setDialogOpen,reload,setUploadProgress)
        } else {
            setLoading(false);
            setDialogOpen(false);
            reload();
        }
    } catch (error) {
        console.log('Error : ',error);
        setError(error);
        setLoading(false);
    }
}

const getUserTwitterProfiles = async(userID,setTwitterProfiles,setLoading,setSelectProfile)=>{
    try {
        setLoading(true);
        const requestListUserTwitterOAuth = await API.graphql({
            query : listTwitterOAuths,
            variables: {
                filter : {
                    userID : { eq : userID }
                }
            }
        });
        console.log('List User Twitter OAuth : ',requestListUserTwitterOAuth);
        setTwitterProfiles(requestListUserTwitterOAuth.data.listTwitterOAuths.items);
        if(requestListUserTwitterOAuth.data.listTwitterOAuths.items.length > 0) setSelectProfile(requestListUserTwitterOAuth.data.listTwitterOAuths.items[0]['id']);
        setLoading(false);
    } catch (error) {
        console.log('Error : ',error);
        setLoading(false);
    }
}

function CronJobDialog ({editJob,setDialogOpen,userID,componentID,reload,loading,setLoading}){
    // console.log('Cron Job Dialog :',editJob);
    // const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [selectAction,setSelectAction] = useState('postTwitterStatus');
    const [twitterPorfiles,setTwitterProfiles] = useState(null);
    const [selectProfile,setSelectProfile] = useState((editJob) ? editJob.twitterOAuthID : null);
    const [textContent,setTextContent] = useState((editJob) ? editJob.text : null);
    const [mediaFile,setMediaFile] = useState(null);
    const [mediaPreview,setMediaPreview] = useState((editJob) ? editJob.mediaPreview : null);
    const [uploadProgrss,setUploadProgress] = useState(null);
    const [track,setTrack] = useState((editJob) ? editJob.track : true);
    const [scheduleTime,setScheduleTime] = useState((editJob) ? new Date(editJob.scheduleTime) : null);
    useEffect(()=>{
        console.log('Selected Job Action',selectAction);
        if(selectAction === "postTwitterStatus") getUserTwitterProfiles(userID,setTwitterProfiles,setLoading,setSelectProfile)
    },[selectAction])
    const JobAction = useMemo(()=>{
        return(
            <FormGroup
                label="Select a Job Action"
                labelFor="text-input"
                style={styles.inputField}
            >
                <HTMLSelect 
                    disabled={(editJob)}
                    defaultValue={(selectProfile)?selectProfile : 'postTwitterStatus'} 
                >
                    <option value={'postTwitterStatus'}>{'Post Twitter Status'}</option>
                </HTMLSelect>
            </FormGroup>
        )
    },[selectAction])
    const ProfileIdentity = useMemo(()=>{
        return (selectAction !== null && twitterPorfiles) ? (
            <FormGroup
                label="Select a Profile"
                labelFor="text-input"
                style={styles.inputField}
            >
                {(twitterPorfiles.length > 0) ?
                    <HTMLSelect 
                        disabled={(editJob)}
                        defaultValue={(selectProfile)?selectProfile : twitterPorfiles[0]['id']} 
                        onChange={(e)=>setSelectProfile(e.target.value)}
                    >
                        {twitterPorfiles.map((profile)=>{
                            return(
                                <option key={profile.id} value={profile.id}>{profile.screen_name}</option>
                            )
                        })}
                    </HTMLSelect> : 
                    <Callout intent={'danger'}>{'There is no profile avalaible for Twitter Post Status. Please authroized a Twitter Account first.'}</Callout>
                }
            </FormGroup>
        ) : null
    },[selectAction,twitterPorfiles])
    const PostMessage = useMemo(()=>{
        return(
            <FormGroup
                // helperText="Helper text with details..."
                label="Text Content"
                labelFor="text-input"
                style={styles.inputField}
            >
                <TextArea   
                    style={{ width : '100%' , maxHeight : 200 , minHeight : 100 }}
                    growVertically={true}
                    intent={'primary'}
                    maxLength={200}
                    placeholder={'Enter the Post Content. 200 Characters in Maximum.'}
                    onChange={(e)=>{setTextContent(e.target.value)}}
                    value={(textContent !== null) ? textContent : ''}
                    // defaultValue={(editTab) ? editTab.description : ''}
                />
            </FormGroup>
        )
    },[selectAction,twitterPorfiles,textContent])
    const UploadMediaContent = useMemo(()=>{
        return(
            <FormGroup
                label="Media Content"
                style={styles.inputField}
                helperText={'Allow PNG and JPEG ONLY'}
            >
                {(mediaPreview) ?
                <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'space-between' }}>
                    <img style={{ borderRadius : 15, margin : 10 , width : 512 , height : 512 / 16 * 9, objectFit : 'cover' , objectPosition : 'center' }} src={mediaPreview}/>
                </div> : null}
                {(uploadProgrss) ? <ProgressBar value={uploadProgrss}/> : null}
                <FileInput
                    fill={true}
                    style={{ marginTop : 5 }}
                    inputProps={{ accept : "image/png, image/jpeg" }}
                    text={(mediaFile) ? mediaFile.name : "Choose file..." }
                    onInputChange={(e)=>{
                        if(e.target.files.length > 0){
                            console.log(e.target.files);
                            // console.log(URL.createObjectURL(e.target.files[0]));
                            setMediaFile(e.target.files[0]);
                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                                // console.log('Image load',reader.result);
                                setMediaPreview(reader.result);
                            });
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />
            </FormGroup>
        )

    },[mediaPreview,uploadProgrss,mediaFile])
    const PerformanceSwitch = useMemo(()=>{
        return (
            <FormGroup
                label="Track Performance (24 Hours)"
                style={{...styles.inputField, display : 'flex', flexDirection : 'row' , flex : 1, alignItems : 'center' , justifyContent : 'space-between' }}
                inline={true}
            >
                <Switch 
                    defaultValue={(editJob) ? editJob.track : track }
                    checked={track} 
                    label="Track" 
                    onChange={()=>setTrack(!track)} />
            </FormGroup>
        )
    },[track,editJob])
    const SchedulePicket = useMemo(()=>{
        return(
            <FormGroup
                label="Schedule"
                style={styles.inputField}
                labelInfo={'(Local Time)'}
            >
                <DateInput
                    fill={true}
                    minDate={new Date()}
                    formatDate={date => date.toLocaleString()}
                    onChange={(date)=>{
                        setScheduleTime(new Date(date));
                    }}
                    onError={new Date()}
                    parseDate={str => new Date(str)}
                    timePrecision={'minute'}
                    placeholder={"M/D/YYYY"}
                    value={(scheduleTime && scheduleTime !== null && scheduleTime.getTime() >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),0,0,0).getTime()) ? scheduleTime : null}
                />
            </FormGroup>
        )
    },[scheduleTime])
    const ErrorToast = useMemo(()=>{
        return(
            <Toaster position={Position.TOP}>
                {(error != null) ? <Toast intent={'danger'} message={error.message} onDismiss={()=>setError(null)} /> : null}
            </Toaster>
        )
    },[error])
    return(
        <div>
            {ErrorToast}
            <h2 className={Classes.DIALOG_HEADER} style={styles.dialogHeader}>
                {(editJob) ? 'Edit Job Setting' : 'Create New Job'}
            </h2>
            <div className={Classes.DIALOG_BODY}>
                {JobAction}
                {ProfileIdentity}
                {(selectAction) ? PerformanceSwitch : null}
                {(selectAction) ? SchedulePicket : null}
                {(selectAction) ? PostMessage : null}
                {(selectAction) ? UploadMediaContent : null}
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button loading={loading} style={styles.actionButtons} intent="primary" text="Confirm" onClick={()=>{
                        if(editJob){
                            updateJobRequest(editJob,setLoading,scheduleTime,textContent,mediaFile,track,setUploadProgress,setError,setDialogOpen,reload)
                        } else {
                            createJobRequest(setLoading,selectAction,selectProfile,scheduleTime,userID,textContent,mediaFile,track,setUploadProgress,setError,componentID,setDialogOpen,reload)
                        }
                    }}/>
                    <Button disabled={loading} style={styles.actionButtons} text="Cancel" onClick={()=>setDialogOpen(false)}/>
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
    }
}
export default CronJobDialog;