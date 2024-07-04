import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, valueconverter } from '../../data.js';
import moment from 'moment';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoListUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${API_KEY}`;
        try {
            const response = await fetch(videoListUrl);
            const result = await response.json();
            if (result.items) {
                setData(result.items);
            } else {
                console.error("No items found in the response", result);
                setData([]);
            }
        } catch (error) {
            console.error("Failed to fetch video data", error);
            setData([]);
        }
    };

    useEffect(() => {
        if (category) {
            fetchData();
        }
    }, [category]);

    return (
        <div className="feed">
            {
                data.map((item, index) => (
                    <Link key={index} to={`/video/${item.id}`} className='card'>
                        <img src={item.snippet?.thumbnails?.medium?.url} alt="" />
                        <h2>{item.snippet?.title}</h2>
                        <h3>{item.snippet?.channelTitle}</h3>
                        <p>{item.statistics ? valueconverter(item.statistics.viewCount) : 'N/A'} &bull; {item.snippet ? moment(item.snippet.publishedAt).fromNow() : 'N/A'}</p>
                    </Link>
                ))
            }
        </div>
    );
};

export default Feed;
