import React from 'react'
import classes from './VideoList.module.css'

const videoList = (props) => {
     
    if (props.videos) {
        var videos = props.videos.map((video, index) => {
            return <div className={`item ${classes.itemBox}`} key={index} onClick={() => props.selectedVideo(index)}>
                 <i className="video icon"></i>
                <div className='content'>
                    <div className="header"><h3 style={{color:'white'}} >{video.description}</h3></div>
                    <br />
                    <div className="meta">Duration: {video.duration} Seconds</div>
                </div>
             </div>
        })
    }
    return (
        <div className={`ui list ${classes.list}`}>
            {videos}
        </div>
    )
}

export default videoList;