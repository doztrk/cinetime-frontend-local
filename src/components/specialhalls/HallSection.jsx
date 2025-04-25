import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HallSection.module.scss';

const HallSection = () => {
  const specialHalls = [
    {
      id: 1,
      name: 'IMAX',
      description: 'Bugüne Dek Yaratılmış "Gerçeğe En Yakın" Sinema Teknolojisi!',
      imageUrl: '/images/halls/imax.jpg',
      slug: 'imax'
    },
    {
      id: 2,
      name: 'GOLD CLASS',
      description: 'Premium sinema deneyimi sunan yataklı koltuklar ve kişisel hizmet.',
      imageUrl: '/images/halls/gold-class.jpg',
      slug: 'gold-class'
    },
    {
      id: 3,
      name: '4DX',
      description: 'Hareket, su, rüzgar ve koku efektleriyle filmler canlanıyor.',
      imageUrl: '/images/halls/4dx.jpg',
      slug: '4dx'
    },
    {
      id: 4,
      name: 'SCREENX',
      description: 'Üç duvarda projeksiyonla panoramik izleme deneyimi.',
      imageUrl: '/images/halls/screenx.jpg',
      slug: 'screenx'
    },
    {
      id: 5,
      name: 'STARIUM',
      description: 'Üstün ses ve görüntü kalitesiyle son teknoloji sinema.',
      imageUrl: '/images/halls/starium.jpg',
      slug: 'starium'
    },
    {
      id: 6,
      name: 'TEMPUR CINEMA',
      description: 'Mükemmel film deneyimi için Tempur şilte koltuklar ile nihai konfor.',
      imageUrl: '/images/halls/tempur.jpg',
      slug: 'tempur-cinema'
    },
    {
      id: 7,
      name: 'D-BOX',
      description: 'Filmdeki hareketlere uyumlu olarak hareket eden koltuklar.',
      imageUrl: '/images/halls/dbox.jpg',
      slug: 'd-box'
    },
    {
      id: 8,
      name: 'SKYBOX',
      description: 'Lüks olanaklarla özel izleme deneyimi.',
      imageUrl: '/images/halls/skybox.jpg',
      slug: 'skybox'
    },
    {
      id: 9,
      name: 'SKY AUDITORIUM',
      description: 'Açık gökyüzü hissi veren bir tavan altında sinema deneyimi.',
      imageUrl: '/images/halls/sky-auditorium.jpg',
      slug: 'sky-auditorium'
    },
    {
      id: 10,
      name: 'PREMIUM CINEMA',
      description: 'Üstün konfor ve hizmetle premium izleme deneyimi.',
      imageUrl: '/images/halls/premium.jpg',
      slug: 'premium-cinema'
    },
    {
      id: 11,
      name: 'MPX',
      description: 'Geliştirilmiş ses ve görüntü ile Modern Premium Deneyim.',
      imageUrl: '/images/halls/mpx.jpg',
      slug: 'mpx'
    }
  ];

  return (
    <section className={styles.specialHalls}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Ayrıcalıklı Salonlar</h2>
        
        <div className={styles.hallGrid}>
          {specialHalls.map((hall) => (
            <div key={hall.id} className={styles.hallCard}>
              <div className={styles.imageContainer}>
                <Image 
                  src={hall.imageUrl}
                  alt={hall.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.hallImage}
                  priority={hall.id <= 3}
                />
                <div className={styles.hallLogo}>
                  <h3>{hall.name}</h3>
                </div>
              </div>
              <div className={styles.hallContent}>
                <p className={styles.hallDescription}>{hall.description}</p>
                <div className={styles.buttonContainer}>
                  <Link href={`/halls/${hall.slug}`} className={styles.primaryButton}>
                    İncele
                  </Link>
                </div>
                <div className={styles.infoButtonsRow}>
                  <div className={styles.infoLinksContainer}>
                    <Link href={`/halls/${hall.slug}/locations`} className={styles.infoButton}>
                      <span className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <span className={styles.buttonText}>Bu salon hangi sinemalarda var?</span>
                    </Link>
                    <Link href={`/halls/${hall.slug}/movies`} className={styles.infoButton}>
                      <span className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                      </span>
                      <span className={styles.buttonText}>Bu salonda hangi filmler var?</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HallSection;