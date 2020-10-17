import React from 'react'

const videoDetail = ({video}) => {
    if (!video) {
        return <div>Loading...</div>
    }
     return (
         <div>
            <div className='ui' >
                 <iframe style={{borderRadius : '20px', border : '5px solid #242526'}} width="720" title={video.description} height="440" src={video.image} />
            </div>
            <div className='ui segment' style={{borderRadius : '20px', border : '5px solid #242526'}}>
                <h4 className='ui header'>{video.description}</h4>
                <p className='ui description'>Uploaded by : {video.name}</p>
                <p className='ui description'>Duration : {video.duration}</p>
            </div>
        </div>
    )
}

export default videoDetail;

 