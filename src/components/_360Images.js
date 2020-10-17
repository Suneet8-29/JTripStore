import React, {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import firebase, { firestore } from 'firebase'
import _ from 'lodash'

import {signOut} from '../actions' 
import {signInCheck} from '../actions'
import Img360 from './Img360'
import Pagination from './Pagination'
import classes from './Pictures.module.css'
import landingClasses from './Landing.module.css'
import headerClasses from './Header.module.css'
import Modal from '../modal'
import UploadImage from './UploadImage'
 
const db = firestore();


function Pictures(props) {  
    const [images, setImages] = useState([]);
    const [indx, setindx] = useState([]);
    const [showMod, setshowMod] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [ddlValue, setDDLValue] = useState('Damdamani360');
    const [uploadImageIndicator, setuploadImageIndicator] = useState(false);
    const [progressValue, setprogressValue] = useState(false);

    const progress = (value) => {
        setprogressValue(value);
    }


    const indicator = () => {
        setuploadImageIndicator(true);
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
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        setLoading(true);
        const fetchImages = async () => {
            const imageCollection = await db.collection(ddlValue).get();
            let imageArray = imageCollection.docs.map(doc => {
                return doc.data();
            })

            imageArray = _.orderBy(imageArray, ['index'], ['desc']);
            setImages(imageArray);
             
            
        }
        fetchImages();
        setLoading(false);
        setuploadImageIndicator(false);
        console.log('called');
    }, [ddlValue, uploadImageIndicator])

    const showModal = (index) => {
         setshowMod(true);
        setindx(index);
    }
    const indexOfLastImage = currentPage * postsPerPage;
    const indeOfFirstImage = indexOfLastImage - postsPerPage;
    const currentImages = images.slice(indeOfFirstImage, indexOfLastImage);
     return (
        <div className={landingClasses.container} style={{ display: 'flex', alignItems: 'center' , flexDirection : 'column'}} >
            <div className={classes.headerText}><h1>360 Renders</h1></div>
            
            { progressValue > 0 && progressValue < 100 ?
                <progress style={{width : '97%', height : '8px'}} value={progressValue} max='100' ></progress> :
                <br/>
            }
            
            <div className={classes.container}>
                <div className={classes.menuBar}>                    
                    <select onChange={(e)=>setDDLValue(e.target.value)} className={classes.dropdown} name="tripSelect" id="trip">
                    <option value="Damdamani360">Damdamani</option>
                    <option value="Deojhar360">Deojhar</option>
                    <option value="Banki360">Banki</option>
                    <option value="Ansupa360">Ansupa</option>
                    </select>
                    <Pagination currentPage={(number)=>setCurrentPage(number)} images={images.length} postsPerPage={postsPerPage} ></Pagination>
                </div>
                <br/>
                {/* <Image showModal={showModal} loading={loading} images = {currentImages} ></Image> */}
                 <Img360 showModal={showModal} loading={loading} images = {currentImages} ></Img360> 
            </div>
            {/* image container */}
            <div style={{width:'97%', display:'flex', flexDirection:'row'}}>
                <UploadImage tab='360Image' counter = {images.length} progress={progress} indicator={indicator} ddlValue = {ddlValue} ></UploadImage>
                <div className={headerClasses.btn} style={{ marginLeft:'56%', display: 'flex', justifyContent: 'center' }}>
                
                    <Link className={classes.link} to='/'>Back</Link> 
                </div>
            </div>
            {
                showMod ? <Modal tab='360Image' onDismiss = {()=>setshowMod(false)} title={currentImages[indx].name} src = {currentImages[indx].image} description='cool' ></Modal> : null
            }
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps, {signOut, signInCheck})(Pictures)
