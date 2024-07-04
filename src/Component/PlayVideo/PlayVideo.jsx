import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, valueconverter } from '../../data.js';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [apidata, setApidata] = useState(null);

    const fetchVideoData = async () => {
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetailsUrl);
        const data = await response.json();
        setApidata(data.items[0]);
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);


    return (
        <div className='play-video'>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <h3>{apidata?apidata.snippet.title:""}</h3>
            <div className="play-video-info">
                <p>1M  Views &bull; 4 day ago</p>
                <div>
                    <span><img src={like} alt="Like" />125</span>
                    <span><img src={dislike} alt="Dislike" />2</span>
                    <span><img src={share} alt="Share" />Share</span>
                    <span><img src={save} alt="Save" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={jack} alt="Publisher" />
                <div>
                    <p>Go_learners</p>
                    <span>1M subscriber</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>Channel that makes learning easier</p>
                <p>Channel that makes learning easier with the xvy and abx</p>
                <hr />
                <h4>130 comments</h4>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="comment">
                        <img src={user_profile} alt="User profile" />
                        <div>
                            <h3>jack Nicholsan<span>1 day ago</span></h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ratione quaerat adipisci eveniet, facere quibusdam quos ea reprehenderit dignissimos voluptates, atque esse assumenda nisi! Sit iusto at dignissimos explicabo voluptate.</p>
                            <div className="comment-action">
                                <img src={like} alt="Like" />
                                <span>224</span>
                                <img src={dislike} alt="Dislike" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;
