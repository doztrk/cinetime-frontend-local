// src/components/features/movies/MovieCard.jsx
import Link from 'next/link';
import React from 'react';
import styles from './MovieCard.module.scss'
import Image from 'next/image';

const MovieCard = (props) => {

  const {title, image, id} = props;

  return (
    <div className={styles.card}>
      <Link href={`/movies/${id}`}passHref >
      <div className={styles.cardContainer}>
      <Image src={`/images/${image}`} 
       alt={title} 
       width={500}
       height={750}
       className={styles.cardImage}
       layout='responsive'/>

        </div>
     </Link>
   </div>
  );
};

export default MovieCard;