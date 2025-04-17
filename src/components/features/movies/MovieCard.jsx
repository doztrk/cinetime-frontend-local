// src/components/features/movies/MovieCard.jsx
import Link from 'next/link';
import React from 'react';
import styles from './MovieCard.module.scss'
import Image from 'next/image';
import { Button } from 'react-bootstrap';

const MovieCard = (props) => {

  const {title, image, id} = props;
  

  return (
    <div className={styles.card}>
      <Link href={`/movies/${id}`} >
      <div className={styles.cardContainer}>
      <Image src={`${image}`} 
       alt={title} 
       className={styles.cardImage}
       style={{objectFit:"cover"}}
       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
       fill
       />
         <div className={styles.cardButtons}>
          <Button size="md" className={styles.button} >
            Hemen Bilet Al
          </Button>
          <Button  size="md" className={styles.button}>
            İncele
          </Button>
    </div>
        </div>
     </Link>
   </div>
  );
};

export default MovieCard;