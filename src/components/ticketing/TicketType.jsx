"use client";

import React, { useState, useEffect } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./TicketType.module.scss";
import {
	getMovieShowtimes,
	getShowtimeById,
} from "@/services/showtime-service";
import { getMovieById } from "@/services/movie-service";
import { getCinemaById } from "@/services/cinema-service";

const TicketTypePage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const movieId = searchParams.get("movieId");
	const cinemaId = searchParams.get("cinemaId");
	const showtimeId = searchParams.get("showtimeId");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [movieDetails, setMovieDetails] = useState(null);
	const [cinemaDetails, setCinemaDetails] = useState(null);
	const [showtimeDetails, setShowtimeDetails] = useState(null);

	// Ticket types and pricing (in a real app, this would come from an API)
	const [ticketTypes, setTicketTypes] = useState([
		{ id: 1, name: "TAM", description: "3D", price: 205, count: 0 },
		{ id: 2, name: "ÖĞRENCİ", description: "3D", price: 190, count: 0 },
	]);

	const [totalPrice, setTotalPrice] = useState(0);

	// Fetch movie, cinema and showtime details
	useEffect(() => {
		const fetchDetails = async () => {
			try {
				setLoading(true);

				// Fetch movie details
				if (movieId) {
					const movieResponse = await getMovieById(movieId);
					if (!movieResponse.ok)
						throw new Error("Failed to fetch movie details");
					const movieData = await movieResponse.json();
					if (movieData?.object) {
						setMovieDetails(movieData.object);
					}
				}

				// Fetch cinema details
				if (cinemaId) {
					const cinemaResponse = await getCinemaById(cinemaId);
					if (!cinemaResponse.ok)
						throw new Error("Failed to fetch cinema details");
					const cinemaData = await cinemaResponse.json();
					if (cinemaData?.object) {
						setCinemaDetails(cinemaData.object);
					}
				}

				// Fetch showtime details
				if (showtimeId) {
					const showtimeResponse = await getShowtimeById(showtimeId);
					if (!showtimeResponse.ok)
						throw new Error("Failed to fetch showtime details");
					const showtimeData = await showtimeResponse.json();
					if (showtimeData?.object) {
						setShowtimeDetails(showtimeData.object);
					}
				}
			} catch (error) {
				console.error("Error fetching details:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (movieId && cinemaId && showtimeId) {
			fetchDetails();
		} else {
			setError("Missing required parameters");
		}
	}, [movieId, cinemaId, showtimeId]);

	// Update total price when ticket counts change
	useEffect(() => {
		const newTotal = ticketTypes.reduce(
			(sum, type) => sum + type.price * type.count,
			0
		);
		setTotalPrice(newTotal);
	}, [ticketTypes]);

	const handleTicketCountChange = (typeId, increment) => {
		setTicketTypes((prevTypes) =>
			prevTypes.map((type) => {
				if (type.id === typeId) {
					const newCount = type.count + increment;
					return {
						...type,
						count: newCount >= 0 ? newCount : 0,
					};
				}
				return type;
			})
		);
	};

	const handleContinue = () => {
		// Check if at least one ticket is selected
		const totalTickets = ticketTypes.reduce((sum, type) => sum + type.count, 0);

		if (totalTickets > 0) {
			// Prepare ticket data for the next step
			const ticketData = ticketTypes.filter((type) => type.count > 0);

			// Navigate to seat selection page
			router.push(
				`/seat-selection?movieId=${movieId}&cinemaId=${cinemaId}&showtimeId=${showtimeId}&tickets=${encodeURIComponent(
					JSON.stringify(ticketData)
				)}&totalAmount=${totalPrice}`
			);
		}
	};

	if (loading) {
		return (
			<Container
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "50vh" }}
			>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	if (error) {
		return (
			<Container className={styles.ticketTypeContainer}>
				<div className={styles.errorMessage}>
					<p>Error: {error}</p>
					<Button variant="primary" onClick={() => router.back()}>
						Go Back
					</Button>
				</div>
			</Container>
		);
	}

	return (
		<Container className={styles.ticketTypeContainer}>
			<div className={styles.stepIndicator}>
				<div className={`${styles.step} ${styles.completed}`}>
					<span className={styles.stepNumber}>✓</span>
					<span className={styles.stepLabel}>Seans Seç</span>
				</div>
				<div className={`${styles.step} ${styles.active}`}>
					<span className={styles.stepNumber}>2</span>
					<span className={styles.stepLabel}>Bilet Tipi</span>
				</div>
				<div className={styles.step}>
					<span className={styles.stepNumber}>3</span>
					<span className={styles.stepLabel}>Koltuk Seçimi</span>
				</div>
				<div className={styles.step}>
					<span className={styles.stepNumber}>4</span>
					<span className={styles.stepLabel}>Ödeme</span>
				</div>
			</div>

			<div className={styles.movieInfo}>
				<h2>Bilet Seçimi</h2>

				<div className={styles.movieDetails}>
					<p className={styles.movieTitle}>
						{movieDetails?.title || "Film Adı"}
					</p>

					<p className={styles.cinemaDetails}>
						{cinemaDetails?.name || "Sinema Adı"} -
						{showtimeDetails
							? ` ${new Date(showtimeDetails.date).toLocaleDateString("tr-TR", {
									day: "numeric",
									month: "long",
									year: "numeric",
							  })} - ${showtimeDetails.startTime}`
							: " Tarih ve Saat"}
					</p>

					<p className={styles.formatDetails}>
						{movieDetails?.formats?.join(", ") || "Format"} -{" "}
						{showtimeDetails?.hall?.name || " Salon Adı"}
					</p>
				</div>
			</div>

			<div className={styles.ticketSelection}>
				<div className={styles.ticketTypeHeader}>
					<p>
						Film ve seansı seçtin, şimdi bilet tipini seçmen gerekiyor. Unutma,
						öğrenci bilet tipi seçtiğinde bu bileti kullanabilmek için sinema
						girişinde öğrenci kimliğini ibraz etmen gerekecektir.
					</p>
				</div>

				{ticketTypes.map((type) => (
					<div key={type.id} className={styles.ticketTypeRow}>
						<div className={styles.ticketTypeInfo}>
							<h3>{type.name}</h3>
							<p>{type.description}</p>
							{type.name === "ÖĞRENCİ" && (
								<p className={styles.ticketNote}>
									* Öğrenci kimliği gereklidir
								</p>
							)}
						</div>

						<div className={styles.ticketPrice}>{type.price} TL</div>

						<div className={styles.ticketCounter}>
							<button
								className={styles.counterButton}
								onClick={() => handleTicketCountChange(type.id, -1)}
								disabled={type.count === 0}
							>
								-
							</button>
							<span className={styles.counterValue}>{type.count}</span>
							<button
								className={styles.counterButton}
								onClick={() => handleTicketCountChange(type.id, 1)}
							>
								+
							</button>
						</div>
					</div>
				))}
			</div>

			<div className={styles.bottomBar}>
				<div className={styles.totalPrice}>
					<span>Toplam Fiyat:</span>
					<span className={styles.priceValue}>{totalPrice} TL</span>
				</div>

				<Button
					className={styles.continueButton}
					disabled={totalPrice === 0}
					onClick={handleContinue}
				>
					Devam Et
				</Button>
			</div>
		</Container>
	);
};

export default TicketTypePage;
