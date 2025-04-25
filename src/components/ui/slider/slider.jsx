'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaClock } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.css';

// 🔥 Animasyon verilerini buradan alıyoruz
import animations from '@/helpers/data/animations.json';

const Slider = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        className="swiper-container"
      >
        {animations.map((anim) => (
          <SwiperSlide key={anim.id}>
            <div
              className="slide-content"
              style={{ backgroundImage: `url(${anim.image})` }}
            >
              <div className="slide-inner">
                <h3>{anim.text}</h3>
                <p className="description">{anim.description}</p>

                <div className="movie-meta">
                  <div className="slide-icons">
                    {/* Yaş Sınırı */}
                    <span className="icon-group">
                      <img
                        src={anim.ageLimit}
                        alt="Yaş Sınırı"
                        className="rtuk-icon"
                      />
                    </span>

                    {/* İçerik Uyarıları */}
                    {anim.warnings.map((src, index) => (
                      <span className="icon-group" key={`warn-${index}`}>
                        <img src={src} alt="Uyarı" className="rtuk-icon" />
                      </span>
                    ))}

                    {/* Etiketler */}
                    {anim.tags.map((src, index) => (
                      <span className="icon-group" key={`tag-${index}`}>
                        <img src={src} alt="Etiket" className="rtuk-icon" />
                      </span>
                    ))}
                  </div>

                  <span className="duration">
                    <FaClock /> {anim.duration}
                  </span>
                </div>

                <div className="buttons">
                  <Link href={`/buy-ticket/${anim.id}`} className="btn btn-buy">
                    Hemen Bilet Al
                  </Link>
                  <Link href={`/movies/${anim.id}`} className="btn btn-detail">
                    İncele
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Slider;
