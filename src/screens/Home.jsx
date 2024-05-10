import React from 'react';
import Swiper from '../components/Swiper';
import List from '../components/List';

import '../styles/home.css';
import Header from '../components/Header';

export default function Home() {
  let api = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=df6a1cb79bc940baa820e4f8ee621e58`;
  let api2 = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=df6a1cb79bc940baa820e4f8ee621e58`;
  let api3 = `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=df6a1cb79bc940baa820e4f8ee621e58`;


  return (
    <>
    {/* <Header/> */}
    <div className="h-main-container">
      <div className="swiper-container">
        <Swiper on={true} speed={3000} slide={3} api={api2} />
      </div>

      <div className="list-container">
        <List api={api} />
      </div>
    </div>

    <Swiper on={false} slide={4} speed={4000} api={api3}/>
    </>
  );
}
