"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.css';

const Slider = () => {
  const animations = [
    { id: 1, animationClass: 'animation-1', text: 'Animasyon 1', image: '/images/film1.jpg' },
    { id: 2, animationClass: 'animation-2', text: 'Animasyon 2', image: '/images/film2.jpg' },
    { id: 3, animationClass: 'animation-3', text: 'Animasyon 3', image: '/images/film3.jpg' },
    { id: 4, animationClass: 'animation-4', text: 'Animasyon 4', image: '/images/film4.jpg' },
    { id: 5, animationClass: 'animation-5', text: 'Animasyon 5', image: '/images/film5.jpg' },
    { id: 6, animationClass: 'animation-6', text: 'Animasyon 6', image: '/images/film6.jpg' },
    { id: 7, animationClass: 'animation-7', text: 'Animasyon 7', image: '/images/film7.jpg' },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true} 
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
        
      }}
      breakpoints={{
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      }}
      className="swiper-container"
    >
      {animations.map((anim) => (
        <SwiperSlide key={anim.id}>
          <div className={`slide-content ${anim.animationClass}`}>
            <img src={anim.image} alt={anim.text} />
            <div className="slide-text">
              <h3>{anim.text}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}

     
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-pagination"></div>

    
    </Swiper>
  );
};

export default Slider;
