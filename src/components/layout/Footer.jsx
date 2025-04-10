'use client';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.links}>
          <li><a href="/">Ana Sayfa</a></li>
          <li><a href="/about">Hakkımızda</a></li>
          <li><a href="/contact">İletişim</a></li>
          <li><a href="/terms">Şartlar ve Koşullar</a></li>
          <li><a href="/privacy">Gizlilik Politikası</a></li>
        </ul>
        <div className={styles.address}>
          <h3>Adreslerimiz</h3>
          <p>Sinema Sokak No:123, Film Şehri, Hollywood vb.</p>
        </div>
        <div className={styles.languageToggle}>
          <button onClick={() => window.location.href = '/'}>Dil Değiştir</button>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2025 Tüm Haklar Saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
