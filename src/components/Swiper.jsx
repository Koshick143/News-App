import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import '../styles/swiper-t-l.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Swiper = (props) => {
  
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(props.api);
        setNews(response.data.articles);
        console.log(response)
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: props.slide,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: props.speed,
      pauseOnHover: props.on,
    };

    const truncateText = (text, limit) => {
      const words = text.split(' ');
      if (words.length > limit) {
          return words.slice(0, limit).join(' ') + '...';
      }
      return text;
  };

     
    return (
      
      <div className="card-swiper-container">

        <Slider {...settings}>
        {news.map((article, index) => (
          <div key={index} id='swiper-card'>
            <a  target='new' id='swiper-a' href={article.url}>
            <img id='t-l-img' src={article.urlToImage} alt={article.title} />
            <p id='swiper-p'>{truncateText(article.title, 10)}</p>
        </a>
          </div>
        ))}
      </Slider>
      </div>
    );
  };
  
  export default Swiper;