import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import '../styles/list.css';

export default function List(props) {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1); // Keep track of the current page

    useEffect(() => {
        fetchNews();
    }, []); // Fetch news only once on component mount

    const fetchNews = async () => {
        try {
            const response = await axios.get(props.api, {
                params: {
                    page: page, // Send the current page number as a parameter
                    // Add any other required parameters here
                },
            });
            setNews((prevNews) => [...prevNews, ...response.data.articles]); // Append new articles to the existing news list
            setPage(page + 1); // Increment page number for the next fetch
            console.log(response);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const loadFunc = () => {
        // This function will be called when scrolling down
        fetchNews();
    };

    // Function to truncate text to a specified number of words
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="li-container">
     
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={true} // Assuming there is always more data available
                loader={<div className="loader" key={0}>Loading more articles ...</div>}
            >
                {news.map((article, index) => (
                    <div key={index} id='list-card'>
                        <div className="list-img">
                            <a target='new' id='list-a' href={article.url}>
                                <img id='t-r-img' src={article.urlToImage} alt='' />
                            </a>
                        </div>
                        <a target='new' id='list-a' href={article.url}>
                            <p id='list-p'>{truncateText(article.title, 10)}</p> 
                        </a>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
