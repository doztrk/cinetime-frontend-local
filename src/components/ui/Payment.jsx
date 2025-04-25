'use client';

import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import './Payment.css';

const Payment = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        agreeToTerms: false,
        receiveUpdates: false
    });

    // Get total amount and seats from URL params
    const selectedSeats = searchParams?.get('seats')?.split(',') || [];
    const totalAmount = searchParams?.get('total') || '0';
    const serviceFee = 1.50; // Sabit servis ücreti
    const grandTotal = (parseFloat(totalAmount) + serviceFee).toFixed(2);

    useEffect(() => {
        // Redirect if no seats are selected
        if (!selectedSeats || selectedSeats.length === 0) {
            router.push('/seat-selection');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [selectedSeats, router]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            alert('Please agree to the Terms and Conditions to continue.');
            return;
        }
        // Burada ödeme işlemleri yapılacak
        // Şimdilik sadece OTP sayfasına yönlendiriyoruz
        router.push(`/otp?total=${grandTotal}&seats=${selectedSeats.join(',')}`);
    };

    if (!selectedSeats || selectedSeats.length === 0) {
        return null;
    }

    return (
        <Container className="payment-container">
            <h2>Payment</h2>
            
            <div className="timer-bar">
                You must complete your purchase within {formatTime(timeLeft)} minutes
            </div>

            <div className="payment-form-wrapper">
                <Form onSubmit={handlePayment}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <div className="price-summary">
                        <div className="price-row">
                            <span>Ticket Total</span>
                            <span>${totalAmount}</span>
                        </div>
                        <div className="price-row">
                            <span>Service Fee</span>
                            <span>${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="price-row grand-total">
                            <span>Grand Total</span>
                            <span>${grandTotal}</span>
                        </div>
                    </div>

                    <div className="info-box">
                        <i className="info-icon">ℹ</i>
                        <p>You can refund your ticket through our website or mobile app up to 1 hour before the showtime. Click for detailed information.</p>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            label="I have read and agree to the Terms and Conditions and Distance Sales Agreement."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="receiveUpdates"
                            checked={formData.receiveUpdates}
                            onChange={handleInputChange}
                            label="I would like to receive information about previews, current events and campaigns via Email and SMS from Cinetime."
                        />
                    </Form.Group>

                    <Button 
                        variant="success" 
                        type="submit" 
                        className="w-100"
                        disabled={!formData.agreeToTerms || timeLeft === 0}
                    >
                        Continue
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Payment; 