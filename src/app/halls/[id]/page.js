'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

export default function HallDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // For now, create mock data based on the ID
      // Later, you'll replace this with your API call
      setTimeout(() => {
        // This is where you would fetch hall data by ID
        // For now we'll create mock data based on the ID
        const hallTypeMap = {
          '1': 'IMAX',
          '2': 'GOLD CLASS',
          '3': '4DX',
          '4': 'SCREENX',
          '5': 'STARIUM',
          '6': 'TEMPUR CINEMA',
          '7': 'D-BOX',
          '8': 'SKYBOX',
          '9': 'SKY AUDITORIUM',
          '10': 'PREMIUM CINEMA',
          '11': 'MPX'
        };
        
        const slugMap = {
          '1': 'imax',
          '2': 'gold-class',
          '3': '4dx',
          '4': 'screenx',
          '5': 'starium',
          '6': 'tempur-cinema',
          '7': 'd-box',
          '8': 'skybox',
          '9': 'sky-auditorium',
          '10': 'premium-cinema',
          '11': 'mpx'
        };
        
        const mockHall = {
          id: parseInt(id),
          name: hallTypeMap[id] || `HALL TYPE ${id}`,
          slug: slugMap[id] || `hall-${id}`,
          description: `Premium experience in our ${hallTypeMap[id] || `HALL TYPE ${id}`} hall.`,
          longDescription: `Experience movies like never before in our ${hallTypeMap[id] || `HALL TYPE ${id}`} hall with the latest technology and premium comfort.`,
          features: [
            'Premium Seating',
            'Advanced Sound System',
            'Enhanced Visual Experience',
            'Special Effects',
            'Luxury Environment'
          ],
          imageUrl: `/images/halls/${slugMap[id] || `hall-${id}`}.jpg`,
          locations: ['Istanbul', 'Ankara', 'Izmir', 'Antalya']
        };
        
        setHall(mockHall);
        setLoading(false);
      }, 300);
    }
  }, [id]);

}