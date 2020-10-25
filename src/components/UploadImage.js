import {firestore,storage } from '../firebase';
import React, { useState, useEffect, Fragment } from 'react'
import {connect} from 'react-redux'
import add from '../images/Add.png'
import classes from './UplaodImage.module.css'
import Modal from 'react-modal'
import headerClasses from './Header.module.css'

Modal.setAppElement('#root');

const db = firestore();
function UploadImage(props) {

    const [image, setImage] = useState(null);
    const [link, setLink] = useState(null);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    
  
    const fileOnChange = (e) => {
        
        if (e.target.files[0]) {
             
            setImage(e.target.files[0]);
         }
         
    }
    
    useEffect(() => {
         if (image) {

             if (props.tab === '360Image') {

                db.collection(`${props.ddlValue}`).doc(`${props.counter + 1}`).set({ //set the doc name as unique every time u add new photo
                    name: `${props.auth.userName}`,//set the name of the user who uploads it
                    image: image.name,
                    index: props.counter + 1,
                     
                }).then(() => {
                    console.log('done');
                    props.indicator();
                })
        
                 
             }
        else{
                if (props.tab === 'videos') {
                    var description = prompt('Please enter a description for the video');
                    var duration=0;
                    var vid = document.createElement('video');
                    var fileURL = URL.createObjectURL(image);
                    vid.src = fileURL;
                    vid.ondurationchange = function() {
                        duration = this.duration;
                    };
                }
                if (props.tab === 'images' ) {
                    description = "image";
                    duration = 'none'
                }
             
                 if (description) {
                
                     const uploadTask = storage.ref(`${props.tab}/${props.ddlValue}/${image.name}-${props.auth.userName}`).put(image);
                 
                     uploadTask.on(
                         "state_changed",
                         snapshot => {
                             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                             props.progress(progress);
                         },
                         error => {
                             console.log(error);
                         },
                         () => {
                             storage
                                 .ref(`${props.tab}/${props.ddlValue}`)
                                 .child(`${image.name}-${props.auth.userName}`)
                                 .getDownloadURL()
                                 .then(url => {

                                     console.log(url);
                            
                                     //set the name of the collection based on the location 
                                     db.collection(`${props.ddlValue}`).doc(`${image.name}-${props.auth.userName}`).set({ //set the doc name as unique every time u add new photo
                                         name: `${props.auth.userName}`,//set the name of the user who uploads it
                                         image: url,
                                         index: props.counter + 1,
                                         description: description,
                                         duration: duration
                                     }).then(() => {
                                         props.indicator();
                                 
                                     })
                                 })
                         }
                     )
                 }
            }
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])
     return (
        <div>
             {
                props.auth.isSignedIn ?
                     <Fragment>
                         {
                             props.tab === '360Image' ?
                                 <Fragment>
                                     <Modal className={classes.modal} isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)} >
                                     <div className="ui card" style={{width : 'inherit'}}>
                                            <div className="content">
                                                <div className="right floated" onClick={()=>setmodalIsOpen(false)} ><i className="window close icon"></i></div>
                                                 Paste the Insta360 link (Exclude https://) 
                                            </div>
                                            <div className="image">
                                             </div>
                                             <div className="extra content">
                                                <div className="ui large transparent left icon input" style={{width : '100%'}}>
                                                <i className="angle double right icon"></i>
                                                    <input onChange={(e) => setLink({ name: e.target.value })} type="text" placeholder="Link..."/>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <span className="right floated">
                                                     <button className={headerClasses.btn} onClick={() => { setImage(link); setmodalIsOpen(false) }} >Upload</button>
                                                </span>
                                            </div>
                                            
                                            </div> 
                                     </Modal> 
                                     <img className={classes.img} src={add} alt='add' onClick={() => setmodalIsOpen(true)}></img>
                             </Fragment>
                              :
                            <Fragment>
                                <label htmlFor="file-input">
                                <img className={classes.img} src={add} alt='add'></img>
                                </label>
                                <input id='file-input' onChange={fileOnChange} type='file' style={{ display: 'none' }} />
                            </Fragment>
                         }
                        
                     </Fragment> :
                    <p style={{color : 'white'}}>*The Admin has not provided you upload rights </p>    
             }          
        </div>
     )
    
}

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps)(UploadImage)
