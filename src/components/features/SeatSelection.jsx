import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SeatSelection.css';

const SeatSelection = ({ movieId }) => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 14;
  const seatPrice = 18.95;

  // Örnek olarak bazı koltukları dolu gösterelim
  const occupiedSeats = ['A-3', 'B-7', 'D-5', 'E-4', 'F-3', 'F-4'];
  // Örnek olarak bazı koltukları engelli koltuğu yapalım
  const handicappedSeats = ['H-1', 'H-2', 'H-13', 'H-14'];

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (occupiedSeats.includes(seatId) || handicappedSeats.includes(seatId)) {
      return;
    }
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      setTotalPrice(prev => Number((prev - seatPrice).toFixed(2)));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalPrice(prev => Number((prev + seatPrice).toFixed(2)));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Lütfen en az bir koltuk seçin');
      return;
    }
    router.push(`/payment?movieId=${movieId}&seats=${selectedSeats.join(',')}&total=${totalPrice}`);
  };

  const calculateTotal = () => {
    return totalPrice.toFixed(2);
  };

  return (
    <div className="seat-selection-container">
      <h2 className="seat-selection-title">Koltuk Seçimi</h2>
      <p className="seat-selection-subtitle">
        Lütfen oturmak istediğiniz koltuğu seçin. Seçili koltuklar dolu görünecektir. 
        Önceki adıma dönerek seçiminizi değiştirebilirsiniz.
      </p>
      
      <div className="screen">
        PERDE
      </div>

      <div className="seats-container">
        {rows.map((row, rowIndex) => (
          <div key={row} className="seat-row">
            <div className="row-label">{row}</div>
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = seatIndex + 1;
              const seatId = `${row}-${seatNumber}`;
              const isSelected = selectedSeats.includes(seatId);
              const isOccupied = occupiedSeats.includes(seatId);
              const isHandicapped = handicappedSeats.includes(seatId);
              
              return (
                <div
                  key={seatNumber}
                  className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''} ${isHandicapped ? 'handicapped' : ''}`}
                  onClick={() => handleSeatClick(row, seatNumber)}
                >
                  {seatNumber}
                </div>
              );
            })}
            <div className="row-label">{row}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-box occupied"></div>
          <span>Dolu Koltuklar</span>
        </div>
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Boş Koltuklar</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Seçili Koltuklar</span>
        </div>
        <div className="legend-item">
          <div className="legend-box handicapped"></div>
          <span>Engelli Koltukları</span>
        </div>
      </div>

      <div className="booking-footer">
        <div className="booking-footer-content">
          <div className="booking-info">
            <div className="booking-info-item">
              <span>TOPLAM</span>
              <span>{calculateTotal()} TL</span>
            </div>
            <div className="booking-info-item">
              <span>SEÇİLEN KOLTUKLAR</span>
              <span>{selectedSeats.join(', ')}</span>
            </div>
          </div>
          <div className="booking-actions">
            <button className="btn-back" onClick={handleBack}>
              GERİ
            </button>
            <button
              className="btn-proceed"
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
            >
              ÖDEMEYE GEÇ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection; 