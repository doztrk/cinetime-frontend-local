'use client';

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaTicketAlt } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { jsPDF } from 'jspdf';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
    const searchParams = useSearchParams();
    
    // Get data from URL params
    const selectedSeats = searchParams?.get('seats')?.split(',') || [];
    const totalAmount = searchParams?.get('total') || '0';
    const grandTotal = totalAmount;

    // Temporary movie data (will be fetched from API later)
    const movieData = {
        title: "SPIDERMAN NO WAY HOME",
        date: "Mon, 23 Oct 2023",
        time: "14:40",
        cinema: "CineTime"
    };

    const handleDownloadTicket = () => {
        const doc = new jsPDF();
        
        // Add cinema logo/header
        doc.setFontSize(24);
        doc.text("CINETIME", 105, 20, { align: "center" });
        
        doc.setLineWidth(0.5);
        doc.line(20, 25, 190, 25);
        
        // Add movie ticket title
        doc.setFontSize(16);
        doc.text("Movie Ticket", 105, 40, { align: "center" });
        
        // Add ticket details
        doc.setFontSize(12);
        const startY = 60;
        const lineHeight = 10;
        
        doc.text(`Movie: ${movieData.title}`, 20, startY);
        doc.text(`Date: ${movieData.date}`, 20, startY + lineHeight);
        doc.text(`Time: ${movieData.time}`, 20, startY + lineHeight * 2);
        doc.text(`Seats: ${selectedSeats.join(', ')}`, 20, startY + lineHeight * 3);
        
        // Add price details
        doc.text("Price Details:", 20, startY + lineHeight * 5);
        doc.text(`Total: $${totalAmount}`, 20, startY + lineHeight * 6);
        
        // Save the PDF
        doc.save('movie-ticket.pdf');
    };

    return (
        <Container fluid className="booking-confirmation-container">
            <div className="booking-header">
                <div className="confirmation-icon">
                    <FaTicketAlt />
                </div>
                <h2>Booking Confirmation</h2>
                <p>Your tickets have been booked successfully!</p>
            </div>

            <div className="movie-details">
                <h3>{movieData.title}</h3>
                <div className="details-row">
                    <span>{movieData.cinema}</span>
                    <span>{movieData.date}</span>
                    <span>{movieData.time}</span>
                </div>
            </div>
            
            <div className="selected-seats">
                <h4>Selected Seats</h4>
                <div className="seat-tags">
                    {selectedSeats.map(seat => (
                        <span key={seat} className="seat-tag">{seat}</span>
                    ))}
                </div>
            </div>
            
            <div className="price-summary">
                <div className="price-row grand-total">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                </div>
            </div>
            
            <Button 
                variant="success" 
                className="download-button"
                onClick={handleDownloadTicket}
            >
                Download Ticket
            </Button>
        </Container>
    );
};

export default BookingConfirmation; 