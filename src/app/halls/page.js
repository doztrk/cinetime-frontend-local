'use client';

import HallSection from '../../components/specialhalls/HallSection';
import styles from './page.module.scss';

export default function HallsPage() {
  console.log("Rendering Halls Page");
  
  return (
    <div className={styles.hallsPage}>
      <div className={styles.hallsHero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Experience Movies Like Never Before</h1>
          <p className={styles.heroSubtitle}>
            Discover our premium halls with cutting-edge technology and ultimate comfort
          </p>
        </div>
      </div>
      
      <HallSection />
    </div>
  );
}