import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const movieId = searchParams.get('movieId');
  const movieTitle = searchParams.get('movieTitle') || '';
  const seats = searchParams.get('seats')?.split(',') || [];
  const total = searchParams.get('total') || 0;
  const showtime = searchParams.get('showtime') || '';
  const date = searchParams.get('date') || '';

  const handleBackToHome = () => {
    router.push('/');
  };

  // Tarihi formatla
  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('tr-TR', options);
  };

  // Saati formatla
  const formatTime = (time) => {
    return time.substring(0, 5); // "14:40" formatında göster
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Bilet Satın Alma İşleminiz Başarılı!</h2>
          <p>Bilet detaylarınız e-posta adresinize gönderilmiştir.</p>
        </div>

        <div className="ticket">
          <div className="ticket-header">
            <h1>CINETIME</h1>
            <div className="ticket-title">Sinema Bileti</div>
          </div>

          <div className="ticket-details">
            <div className="detail-row">
              <span className="label">Film:</span>
              <span className="value">{movieTitle}</span>
            </div>
            <div className="detail-row">
              <span className="label">Tarih:</span>
              <span className="value">{formatDate(date)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Saat:</span>
              <span className="value">{formatTime(showtime)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Koltuklar:</span>
              <span className="value">{seats.join(', ')}</span>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="price-details">
            <div className="detail-row">
              <span className="label">Normal Bilet ({seats.length}):</span>
              <span className="value">{total} TL</span>
            </div>
            <div className="detail-row">
              <span className="label">Hizmet Bedeli:</span>
              <span className="value">1.50 TL</span>
            </div>
            <div className="detail-row total">
              <span className="label">Toplam:</span>
              <span className="value">{Number(total) + 1.50} TL</span>
            </div>
          </div>

          <div className="ticket-footer">
            <p>* Gişeden QR kodu okutunuz</p>
            <p>* Bu bilet iptal edilemez</p>
          </div>
        </div>

        <button 
          className="download-button"
          onClick={() => window.print()}
        >
          Bileti İndir
        </button>

        <button 
          className="back-home-button"
          onClick={handleBackToHome}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation; 