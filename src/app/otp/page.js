'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './otp.css';

export default function OTPPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [error, setError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showNotification, setShowNotification] = useState(true);

    const seats = searchParams.get('seats');
    const total = searchParams.get('total');

    useEffect(() => {
        // Rastgele 4 haneli OTP kodu oluştur
        const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(randomOtp);
        
        // 5 saniye sonra bildirimi kapat
        const notificationTimer = setTimeout(() => {
            setShowNotification(false);
        }, 5000);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(notificationTimer);
        };
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

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        
        if (enteredOtp === generatedOtp) {
            router.push(`/booking-confirmation?seats=${seats}&total=${total}`);
        } else {
            setError('Invalid OTP code. Please try again.');
        }
    };

    const handleResendOtp = () => {
        const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(randomOtp);
        setShowNotification(true);
        // 5 saniye sonra bildirimi kapat
        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
        setError('');
    };

    return (
        <div className="otp-container">
            {showNotification && (
                <div className="notification">
                    <p>For testing: Your OTP code is: {generatedOtp}</p>
                    <button className="notification-close" onClick={() => setShowNotification(false)}>
                        Tamam
                    </button>
                </div>
            )}
            <h2>Enter OTP</h2>
            <p className="otp-description">
                Please enter the verification code
            </p>
            <p className="timer">
                Time remaining: {formatTime(timeLeft)}
            </p>
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
                {error && <p className="error-message">{error}</p>}
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={otp.join('').length !== 4}
                >
                    Submit
                </button>
                <button 
                    type="button" 
                    className="resend-button"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            </form>
        </div>
    );
} 