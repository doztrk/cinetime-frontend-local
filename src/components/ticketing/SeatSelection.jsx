"use client";

import { response } from "@/helpers/form-validation";
import { getCinemaById } from "@/services/cinema-service";
import { getMovieById } from "@/services/movie-service";
import { getShowtimeById } from "@/services/showtime-service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import styles from "./SeatSelection.module.scss";

const SeatSelection = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const movieId = searchParams.get("movieId");
	const cinemaId = searchParams.get("cinemaId");
	const showtimeId = searchParams.get("showtimeId");
	const ticketsParam = searchParams.get("tickets");
	const totalAmount = searchParams.get("totalAmount");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [movieDetails, setMovieDetails] = useState(null);
	const [cinemaDetails, setCinemaDetails] = useState(null);
	const [showtimeDetails, setShowtimeDetails] = useState(null);
	const [tickets, setTickets] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);

	//Burayi ileride DB'den alacagiz
	const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
	const seatsPerRow = 14;

	const [occupiedSeats, setOccupiedSeats] = useState([
		"A3",
		"B7",
		"C10",
		"D5",
		"E4",
		"F3",
		"F4",
	]);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				setLoading(true);
				if (ticketsParam) {
					const ticketsData = JSON.parse(decodeURIComponent(ticketsParam));
					setTickets(ticketsData);
				}

				if (movieId) {
					const movieResponse = await getMovieById(movieId);
					if (!movieResponse.ok)
						throw new Error("Failed to fetch movie details");
					const movieData = await movieResponse.json();
					if (movieData?.object) {
						setMovieDetails(movieData.object);
					}
				}

				if (cinemaId) {
					const cinemaResponse = await getCinemaById(cinemaId);
					if (!cinemaResponse.ok)
						throw new Error("Failed to fetch cinema details");

					const cinemaData = await cinemaResponse.json();
					if (cinemaData?.object) {
						setCinemaDetails(cinemaData.object);
					}
				}

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
				console.log("Error fetching details:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (movieId && cinemaId && showtimeId && ticketsParam) {
			fetchDetails();
		} else {
			setError("Missing required parameters");
		}
	}, [movieId, cinemaId, showtimeId, ticketsParam]);

	const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.count, 0);

	const handleSeatClick = (seatId) => {
		if (occupiedSeats.includes(seatId)) {
			return;
		}

		//Eğer seat seçiliyse bunu cıkartıyoruz
		setSelectedSeats((prevSelected) => {
			if (prevSelected.includes(seatId)) {
				return prevSelected.filter((seat) => seat !== seatId);
			}

			//Eğer bılet sayısından fazla ticket seçersek, bir önceki seçimimize geri dönüyor.
			if (prevSelected.length >= totalTickets) {
				return prevSelected;
			}

			return [...prevSelected, seatId];
		});
	};

	const getSeatStatus = (seatId) => {
		if (occupiedSeats.includes(seatId)) return "Occupied";
		if (selectedSeats.includes(seatId)) return "Selected";
		return "Available";
	};

	const handleContinue = () => {
		if (selectedSeats.length === totalTickets) {
			router.push(
				`/payment?movieId=${movieId}&cinemaId=${cinemaId}&showtimeId=${showtimeId}&seats=${selectedSeats.join(
					","
				)}&totalAmount=${totalAmount}`
			);
		}
	};

	const handleBack = () => {
		router.back();
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
			<Container className={styles.seatSelectionContainer}>
				<div className={styles.errorMessage}>
					<p> Error: {error}</p>
					<Button variant="primary" onclick={handleBack}>
						Go Back
					</Button>
				</div>
			</Container>
		);
	}

	return (
		<Container className={styles.seatSelectionContainer}>
			<div className={styles.stepIndicator}>
				<div className={`${styles.step} ${styles.completed}`}>
					<span className={styles.stepNumber}>✔︎</span>
					<span className={styles.stepLabel}>Seans Seç</span>
				</div>
				<div className={`${styles.step} ${styles.completed}`}>
					<span className={styles.stepNumber}>✔︎</span>
					<span className={styles.stepLabel}>Bilet Tipi</span>
				</div>
				<div className={`${styles.step} ${styles.active}`}>
					<span className={styles.stepNumber}>3</span>
					<span className={styles.stepLabel}>Koltuk Seçimi</span>
				</div>
				<div className={styles.step}>
					<span className={styles.stepNumber}>4</span>
					<span className={styles.stepLabel}>Ödeme</span>
				</div>
			</div>
			<div className={styles.movieInfo}>
				<h2>Koltuk Seçimi</h2>
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
						{movieDetails?.formats?.join(", " || "Format")} -
						{showtimeDetails?.hall?.name || "Salon Adı"}
					</p>
				</div>

				<p className={styles.selectionInstruction}>
					Lütfen {totalTickets} seçiniz. Seçili koltuklar dolu görünecektir.
				</p>
			</div>

			<div className={styles.screenContainer}>
				<div className={styles.screen}>PERDE</div>
			</div>

			<div className={styles.seatsContainer}>
				{rows.map((row) => (
					<div key={row} className={styles.seatRow}>
						<div className={styles.rowLabel}>{row}</div>

						{Array.from({ length: seatsPerRow }, (_, index) => {
							const seatNumber = index + 1;
							const seatId = `${row}${seatNumber}`;

							return (
								<div
									key={seatId}
									className={`${styles.seat} ${
										selectedSeats.includes(seatId)
											? styles.selected
											: occupiedSeats.includes(seatId)
											? styles.occupied
											: styles.available
									}`}
									onClick={() => handleSeatClick(seatId)}
								>
									{seatNumber}
								</div>
							);
						})}

						<div className={styles.rowLabel}>{row}</div>
					</div>
				))}
			</div>
			<div className={styles.legend}>
				<div className={styles.legendItem}>
					<div className={`${styles.seat} ${styles.available}`}></div>
					<span>Boş Koltuk</span>
				</div>
				<div className={styles.legendItem}>
					<div className={`${styles.seat} ${styles.selected}`}></div>
					<span>Seçili Koltuk</span>
				</div>
				<div className={styles.legendItem}>
					<div className={`${styles.seat} ${styles.occupied}`}></div>
					<span>Dolu Koltuk</span>
				</div>
			</div>

			<div className={styles.bottomBar}>
				<div className={styles.selectionInfo}>
					<div className={styles.selectedCount}>
						<span>SEÇİLEN KOLTUKLAR</span>
						<span>{selectedSeats.sort().join(", " || "-")}</span>
					</div>

					<div className={styles.totalAmount}>
						<span>TOPLAM</span>
						<span>{totalAmount} TL</span>
					</div>
				</div>

				<div className={styles.actionButtons}>
					<Button
						variant="outline-light"
						className={styles.backButton}
						onClick={handleBack}
					>
						Geri
					</Button>

					<Button
						variant="success"
						className={styles.continueButton}
						disabled={selectedSeats.length !== totalTickets}
						onClick={handleContinue}
					>
						Devam Et
					</Button>
				</div>
			</div>
		</Container>
	);
};
export default SeatSelection;
