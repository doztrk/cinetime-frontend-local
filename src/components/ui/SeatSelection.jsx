'use client';

import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import './SeatSelection.css';

const SeatSelection = () => {
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isClient, setIsClient] = useState(false); // 👈 SSR kontrolü
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 14;
    const pricePerSeat = 18.95;

    useEffect(() => {
        setIsClient(true); // 👈 sadece client'ta render edilmeye başlar
    }, []);

    const occupiedSeats = ['D1', 'D8', 'F3', 'F4','E4','F14','F13','E10','E11','E4','E4',];

    const handleSeatClick = (seatId) => {
        if (occupiedSeats.includes(seatId)) return;

        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(seat => seat !== seatId);
            } else {
                return [...prev, seatId];
            }
        });
    };

    const getSeatStatus = (seatId) => {
        if (occupiedSeats.includes(seatId)) return 'occupied';
        if (selectedSeats.includes(seatId)) return 'selected';
        return 'available';
    };

    const handleBack = () => {
        console.log('Back button clicked');
    };

    const handleProceedPayment = () => {
        if (selectedSeats.length > 0) {
            const total = calculateTotal();
            router.push(`/payment?seats=${selectedSeats.join(',')}&total=${total}&redirect=otp`);
        }
    };

    const calculateTotal = () => {
        return (selectedSeats.length * pricePerSeat).toFixed(2);
    };

    if (!isClient) return null; // 👈 SSR sırasında boş döner, hydration hatası engellenir

    return (
        <Container fluid className="seat-selection-container">
            <div className="seat-selection-header">
                <h2>Select Your Seats</h2>
                <p>Choose where you would like to sit. Selected seats will appear occupied. You can change your selection by returning to the previous step.</p>
            </div>

            <div className="screen-container">
                <div className="screen">SCREEN</div>
            </div>

            <div className="seats-container">
                {rows.map(row => (
                    <div key={row} className="seat-row">
                        <div className="row-label">{row}</div>
                        {[...Array(seatsPerRow)].map((_, index) => {
                            const seatId = `${row}${index + 1}`;
                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${getSeatStatus(seatId)}`}
                                    onClick={() => handleSeatClick(seatId)}
                                >
                                    {seatId.substring(1)}
                                </div>
                            );
                        })}
                        <div className="row-label">{row}</div>
                    </div>
                ))}
            </div>

            <div className="legend">
                <div className="legend-item">
                    <div className="seat occupied"></div>
                    <span>Occupied Seats</span>
                </div>
                <div className="legend-item">
                    <div className="seat available"></div>
                    <span>Available Seats</span>
                </div>
                <div className="legend-item">
                    <div className="seat selected"></div>
                    <span>Your Selection</span>
                </div>
                <div className="legend-item">
                    <div className="seat handicapped"></div>
                    <span>Handicapped Seats</span>
                </div>
            </div>

            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <div className="selection-info">
                        <div className="total">
                            <span>TOTAL</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <div className="selected-seats">
                            <span>SELECTED SEATS</span>
                            <span>{selectedSeats.sort().join(', ') || '-'}</span>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <Button variant="outline-light" onClick={handleBack}>Back</Button>
                        <Button 
                            variant="success" 
                            onClick={handleProceedPayment}
                            disabled={selectedSeats.length === 0}
                        >
                            Proceed Payment
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SeatSelection;
