import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './OTPVerification.css';

const OTPVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 dakika
  const [error, setError] = useState('');

  useEffect(() => {
    // 4 haneli rastgele OTP oluştur
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(newOTP);
  }, []);

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

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Otomatik olarak sonraki input'a geç
      if (value !== '' && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace tuşuna basıldığında önceki input'a geç
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    
    if (enteredOTP === generatedOTP) {
      const movieId = searchParams.get('movieId');
      const seats = searchParams.get('seats');
      const total = searchParams.get('total');
      const showtime = searchParams.get('showtime');
      const date = searchParams.get('date');
      const movieTitle = searchParams.get('movieTitle');
      
      router.push(`/booking-confirmation?movieId=${movieId}&seats=${seats}&total=${total}&showtime=${showtime}&date=${date}&movieTitle=${movieTitle}`);
    } else {
      setError('Hatalı kod girdiniz. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-content">
        <h1>Doğrulama Kodu</h1>
        
        <div className="otp-info">
          <p>Doğrulama kodunuz:</p>
          <div className="generated-otp">{generatedOTP}</div>
          <p>Kalan süre: {formatTime(timeLeft)}</p>
        </div>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="verify-button"
            disabled={otp.join('').length !== 4 || timeLeft === 0}
          >
            Doğrula
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification; 