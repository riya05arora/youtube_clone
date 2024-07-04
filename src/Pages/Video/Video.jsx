import React from 'react'
import './Video.css'
import PlayVideo from '../../Component/PlayVideo/PlayVideo'
import Recomended from '../../Component/Recomended/Recomended'
import {useParams} from 'react-router-dom'
const Video=()=>{
  const {videoId,categoryId}=useParams();
  return(
    <div className="play-container">
     <PlayVideo videoId={videoId}/>
     <Recomended/>
    </div>
  )
}
export default Video
