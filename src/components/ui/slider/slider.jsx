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

const Slider = () => {
  const animations = [
    {
      id: 1,
      text: 'Amatör',
      image: '/images/movies/comingsoon/amator.png',
      description:
        'Hayatın sıradanlığına başkaldıran genç bir yönetmenin, sokaklardan gelen hikâyesi. Bağımsız sinema tadında çarpıcı bir yolculuk.',
      ageLimit: '/images/rturk/rtuk-akilli-isaretler-13-yas-ve-uzeri-icin-logo-png_seeklogo-120539.png',
      warnings: [],
      tags: ['/images/rturk/rtuk-akilli-isaretler-genel-izleyici-kitlesi-logo-png_seeklogo-120543.png'],
      duration: '1 sa 30 dk',
    },
    {
      id: 2,
      text: 'Başlangıç',
      image: '/images/movies/comingsoon/baslangic.png',
      description:
        'Gerilimin ve gizemin iç içe geçtiği bu yapımda, bir ajan gerçeklik ile rüyalar arasında sıkışıp kalıyor.',
      ageLimit: '/images/rturk/rtuk-akilli-isaretler-13-yas-ve-uzeri-icin-logo-png_seeklogo-120539.png',
      warnings: ['/images/rturk/rtuk-akilli-isaretler-siddet-korku-logo-png_seeklogo-120545.png'],
      tags: ['/images/rturk/rtuk-akilli-isaretler-genel-izleyici-kitlesi-logo-png_seeklogo-120543.png'],
      duration: '2 sa 30 dk',
    },
    {
      id: 3,
      text: 'Ölü Mevsim',
      image: '/images/movies/comingsoon/olumevsim.png',
      description:
        'Sakin bir kasabada geçen esrarengiz olaylar, geçmişin karanlık sırlarını gün yüzüne çıkarıyor.',
      ageLimit: '/images/rturk/rtuk-akilli-isaretler-13-yas-ve-uzeri-icin-logo-png_seeklogo-120539.png',
      warnings: [
        '/images/rturk/rtuk-olumsuz-ornek-olusturabilecek-davranislar-logo-png_seeklogo-120544.png',
        '/images/rturk/rtuk-akilli-isaretler-siddet-korku-logo-png_seeklogo-120545.png',
      ],
      tags: ['/images/rturk/rtuk-akilli-isaretler-genel-izleyici-kitlesi-logo-png_seeklogo-120543.png'],
      duration: '2 sa 10 dk',
    },
    {
      id: 4,
      text: 'Dune 5',
      image: '/images/movies/nowshowing/dune5.png',
      description:
        'Çöl gezegeni Arrakis’teki efsane devam ediyor. Epik sahneler, büyük savaşlar ve güç mücadeleleri seni bekliyor.',
      ageLimit: '/images/rturk/rtuk-akilli-isaretler-13-yas-ve-uzeri-icin-logo-png_seeklogo-120539.png',
      warnings: ['/images/rturk/rtuk-akilli-isaretler-siddet-korku-logo-png_seeklogo-120545.png'],
      tags: ['/images/rturk/rtuk-akilli-isaretler-genel-izleyici-kitlesi-logo-png_seeklogo-120543.png'],
      duration: '2 sa 45 dk',
    },
    {
      id: 5,
      text: 'Şerif 6',
      image: '/images/movies/nowshowing/sheriff6.png',
      description:
        'Modern bir western! Kanunsuzlarla dolu kasabada adaletin sesi yükseliyor. Aksiyon ve dram bir arada.',
      ageLimit: '/images/rturk/rtuk-akilli-isaretler-18-yas-ve-uzeri-icin-logo-png_seeklogo-120540.png',
      warnings: [
        '/images/rturk/rtuk-olumsuz-ornek-olusturabilecek-davranislar-logo-png_seeklogo-120544.png',
        '/images/rturk/rtuk-akilli-isaretler-siddet-korku-logo-png_seeklogo-120545.png',
      ],
      tags: ['/images/rturk/rtuk-akilli-isaretler-cinsellik-logo-png_seeklogo-120542.png'],
      duration: '1 sa 50 dk',
    },
  ];
  

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false}}
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
                      <img src={anim.ageLimit} alt="Yaş Sınırı" className="rtuk-icon" />
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
