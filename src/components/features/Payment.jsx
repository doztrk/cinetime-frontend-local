import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './Payment.css';

const Payment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const movieId = searchParams.get('movieId');
  const seats = searchParams.get('seats')?.split(',') || [];
  const total = searchParams.get('total') || 0;
  const [timeLeft, setTimeLeft] = useState(300); // 5 dakika = 300 saniye

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [isChecked, setIsChecked] = useState({
    terms: false,
    marketing: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIsChecked(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked.terms) {
      alert('Lütfen şartları ve koşulları kabul edin');
      return;
    }
    router.push(`/otp-verification?movieId=${movieId}&seats=${seats.join(',')}&total=${total}&showtime=${searchParams.get('showtime')}&date=${searchParams.get('date')}&movieTitle=${searchParams.get('movieTitle')}`);
  };

  return (
    <div className="payment-container">
      <h1>Ödeme</h1>
      
      <div className="timer-bar">
        Satın alma işlemini {formatTime(timeLeft)} dakika içinde tamamlamalısınız
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ad Soyad"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta Adresi"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Telefon Numarası"
            required
          />
        </div>

        <div className="price-summary">
          <div className="price-item">
            <span>{seats.length} Adet Bilet:</span>
            <span>{total} TL</span>
          </div>
          <div className="price-item total">
            <span>Toplam:</span>
            <span>{total} TL</span>
          </div>
        </div>

        <div className="info-box">
          <i className="info-icon">i</i>
          <p>Biletinizi gösterim saatinden 1 saat öncesine kadar web sitemiz veya mobil uygulamamız üzerinden iade edebilirsiniz. Detaylı bilgi için tıklayınız.</p>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={isChecked.terms}
              onChange={handleCheckboxChange}
            />
            <span>Mesafeli Satış Sözleşmesi'ni ve Şartlar ve Koşullar'ı okudum, kabul ediyorum.</span>
          </label>
          
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={isChecked.marketing}
              onChange={handleCheckboxChange}
            />
            <span>Paribu Cineverse'den gelecek kampanya, etkinlik ve özel gösterim bilgilerini E-posta ve SMS ile almak istiyorum.</span>
          </label>
        </div>

        <button 
          type="submit"
          className="btn-continue"
          disabled={!isChecked.terms}
        >
          Devam Et
        </button>
      </form>
    </div>
  );
};

export default Payment; 