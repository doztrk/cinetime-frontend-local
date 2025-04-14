'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SeatSelection from '../../components/features/SeatSelection';

export default function SeatSelectionPage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId');

  if (!movieId) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Film bilgisi bulunamadı. Lütfen film seçim sayfasına geri dönün.
        </div>
      </div>
    );
  }

  return <SeatSelection movieId={movieId} />;
} 