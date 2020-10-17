import React from 'react'
import classes from './Image.module.css'

function Image({ loading, images, showModal }) {
    
     
    if (loading) {
        return <h2>Loading...</h2>
    }

    const showModalOnClick = (index) => {
        showModal(index);
    } 

    return (
        <div className={classes.container}> 
            {
                 images.map((src, index) => {
                    return <div  key={index} className={classes.divContainer} ><img onDoubleClick={()=>showModalOnClick(index)}  className = {classes.box} src={src.image} alt='pic' /></div>
                })
                 
            }   
        </div>
    )
}

export default Image
