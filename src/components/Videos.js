import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import firebase, { firestore } from 'firebase'
import _ from 'lodash'

import UploadImage from './UploadImage'
import VideoDetail from './VideoDetail'
import VideoList from './VideoList'
import {signOut} from '../actions' 
import {signInCheck} from '../actions'
import landingClasses from './Landing.module.css'
import picturesClasses from './Pictures.module.css'
import headerClasses from './Header.module.css'
import videoListClasses from './VideoList.module.css'

const db = firestore();

function Videos(props) {

    const [progressValue, setprogressValue] = useState(false);
    const [ddlValue, setDDLValue] = useState('DamdamaniVid');
    const [uploadImageIndicator, setuploadImageIndicator] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [indx, setindx] = useState(0);
    const progress = (value) => {
        setprogressValue(value);
    }

    const indicator = () => {
        setuploadImageIndicator(true);
    }

    const selectedVideo = (index) => {
        setindx(index)
    }

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                    props.signInCheck({ displayName : user.displayName,
                    photoURL : user.photoURL });
                
            }
            else {
                props.signOut();
            }       
        })
      
    }, []);

    useEffect(() => {

        setLoading(true);
        const fetchImages = async () => {
            const videoCollection = await db.collection(ddlValue).get();
            let videoArray = videoCollection.docs.map(doc => {
                return doc.data();
            })

            videoArray = _.orderBy(videoArray, ['index'], ['desc']);
            setVideos(videoArray);        
        }
        fetchImages();
        setLoading(false);
        setuploadImageIndicator(false);
        console.log('called');
    }, [ddlValue, uploadImageIndicator])


    
    return (
        <div className={landingClasses.container} style={{ display: 'flex', alignItems: 'center' , flexDirection : 'column'}} >
            <div className={picturesClasses.headerText}><h1>Videos Tab</h1></div>
            
            { progressValue > 0 && progressValue < 100 ?
                <progress style={{width : '97%', height : '8px'}} value={progressValue} max='100' ></progress> :
                <br/>
            }
            
            <div className={picturesClasses.container}>
                <div className={picturesClasses.menuBar}>                    
                    <select onChange={(e)=>setDDLValue(e.target.value)} className={picturesClasses.dropdown} name="tripSelect" id="trip">
                    <option value="DamdamaniVid">Damdamani</option>
                    <option value="DeojharVid">Deojhar</option>
                    <option value="BankiVid">Banki</option>
                    <option value="AnsupaVid">Ansupa</option>
                    </select>
                 </div>
                <br />
                <div className={videoListClasses.ui}>
                    <div >
                        <VideoDetail video = {videos[indx]} ></VideoDetail>
                    </div>
                    <div >
                            <VideoList selectedVideo={selectedVideo} loading = {loading} videos={videos}></VideoList>
                    </div> 
              </div>
             </div>
             
            
            <div style={{width:'97%', display:'flex', flexDirection:'row'}}>
                <UploadImage tab='videos' counter={videos.length} progress={progress} indicator={indicator} ddlValue={ddlValue} ></UploadImage> 
                 <div className={headerClasses.btn} style={{ marginLeft:'56%', display: 'flex', justifyContent: 'center' }}>
                    <Link className={picturesClasses.link} to='/'>Back</Link> 
                    
                </div>
                
            </div>
            
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps, {signOut, signInCheck})(Videos)
