import React,{useState} from 'react'
import classes from './Img360.module.css'

function Img360({ loading, images, showModal }) {
    
    const [button, setButton] = useState({})
     
    if (loading) {
        return <h2>Loading...</h2>
    }

    const showModalOnClick = (index) => {
        showModal(index);
    } 

    const setIframeBtn = () => {
         
        setButton({'zIndex': 1})
    }

    const UnSetIframeBtn = () => {
         
        setButton({})
    }

    return (
        <div className={classes.container} > 
            {
                 images.map((src, index) => {
                     return <div onMouseEnter={setIframeBtn}
                         onMouseLeave={UnSetIframeBtn}
                         key={index} className={classes.divContainer} >
                         <button className={classes.iframe_button} style={button} onClick={()=>showModalOnClick(index)} >ZOOM-IN</button>
                         <iframe  
                             className={classes.box}
                             src={`https://${src.image}`}
                             frameBorder="0" title='cool' width="666" height="413">                            
                         </iframe>
                         
                     </div>
                })
                 
            }   
        </div>
    )
}

export default Img360
