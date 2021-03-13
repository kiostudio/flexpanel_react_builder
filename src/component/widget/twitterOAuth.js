import { useEffect , useMemo, useState } from 'react';
import { API , graphqlOperation } from 'aws-amplify';
import { InputGroup , Icon , Classes , Navbar , Button , ButtonGroup , Tag , TagInput , Popover , Tooltip , Menu , MenuItem , Spinner , HTMLTable , Switch , Position , Drawer ,  Toaster , Toast , Alignment, FormGroup } from "@blueprintjs/core";
import { twitterOAuth } from '../../graphql/mutations';
import { onUpdateTwitterOAuth } from '../../graphql/subscriptions';
import { getTwitterOAuth } from '../../graphql/queries';
import { AiOutlineTwitter } from 'react-icons/ai';

const initTwitterOAuth = async(componentID,setLoading,userID,setCreateTwitterOAuthID)=>{
    try {
        setLoading(true);
        const requestToInitTwitterOAuth = await API.graphql({
            query : twitterOAuth,
            variables: {
                action: "init",
                componentID: componentID,
                userID: userID
            }
        });
        console.log('Twitter OAuth Res :',requestToInitTwitterOAuth)
        if(requestToInitTwitterOAuth.data.twitterOAuth.twitterOAuthID) setCreateTwitterOAuthID(requestToInitTwitterOAuth.data.twitterOAuth.twitterOAuthID)
        if(requestToInitTwitterOAuth.data.twitterOAuth.access_token_key && requestToInitTwitterOAuth.data.twitterOAuth.access_token_secret){
            window.open("https://api.twitter.com/oauth/authenticate?oauth_token="+requestToInitTwitterOAuth.data.twitterOAuth.access_token_key);
        } else {
            throw new Error('Twitter OAuth cannot initiate, please contact our admin.')
        }
        // setLoading(false);
    } catch (error) {
        console.log('Twitter OAuth Error :',error);
        setLoading(false);
    }
}

const getTwitterProfile = async(twitterOAuthID,setLoading,setTwitterProfile)=>{
    try {
        setLoading(true);
        const getTwitterOAuthRequest = await API.graphql({
            query : getTwitterOAuth,
            variables: {
                id : twitterOAuthID
            }
        });
        console.log('Twitter OAuth Profile Res :',getTwitterOAuthRequest)
        setTwitterProfile(getTwitterOAuthRequest.data.getTwitterOAuth);
        setLoading(false);
    } catch (error) {
        console.log('Get Twitter OAuth Error :',error);
        setLoading(false);
    }
}

function TwitterOAuth({item,userRole,userID,setDragEnable}){
    const [loading,setLoading] = useState(false);
    const [twitterProfile,setTwitterProfile] = useState(null);
    const [createTwitterOAuthID,setCreateTwitterOAuthID] = useState(null);
    useEffect(()=>{
        if(item.component.twitterOAuthID) getTwitterProfile(item.component.twitterOAuthID,setLoading,setTwitterProfile)
    },[]);
    useEffect(()=>{
       const subscription = API.graphql(
          graphqlOperation(onUpdateTwitterOAuth)
      ).subscribe({
          next: (data) => { 
            setCreateTwitterOAuthID((twitterOAuthID)=>{
                if(twitterOAuthID) getTwitterProfile(twitterOAuthID,setLoading,setTwitterProfile)
                return twitterOAuthID;
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
    return (userRole === 'owner') ? (
        <div 
            style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center' , flexDirection : 'column' , paddingTop : 10 }}
        >
            { (twitterProfile === null || (twitterProfile && twitterProfile.access_token_secret == null)) ?<Button 
                loading={loading}
                intent={'primary'}
                text={'Authorize A Twitter Account'}
                onClick={()=>initTwitterOAuth(item.component.id,setLoading,userID,setCreateTwitterOAuthID)}
            /> : 
            <div style={{ display : 'flex' , flexDirection : 'column', alignItems : 'center' , justifyContent : 'center' }}>
                <AiOutlineTwitter color={'#FFFFFF'} size={30}/>
                <h4 style={{ margin : 5 , color : '#FFFFFF' }}>{'Authorized Twitter Account'}</h4>
                <a href={"https://twitter.com/"+twitterProfile.screen_name} target="_blank">
                    <Tag intent={'success'}>{`@${twitterProfile.screen_name}`}</Tag>
                </a>
            </div>}
        </div>
    ) : <h3 style={{ color : '#FFFFFF' }}>{'This is a Private Widget'}</h3>
}

export default TwitterOAuth;