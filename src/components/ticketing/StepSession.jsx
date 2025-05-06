"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./StepSession.module.scss";
import {
	getInTheatersMovies,
	getMovieShowtimes,
} from "@/services/movie-service";

const StepSessionPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const movieIdParam = searchParams.get("movieId");

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [movies, setMovies] = useState([]);
	const [cinemas, setCinemas] = useState([]);
	const [showtimes, setShowtimes] = useState([]);

	const [selectedMovie, setSelectedMovie] = useState(movieIdParam || null);
	const [selectedCinema, setSelectedCinema] = useState(null);
	const [selectedShowtime, setSelectedShowtime] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);
				const response = await getInTheatersMovies();

				if (!response.ok) {
					throw new Error("Failed to fetch movies");
				}

				const data = await response.json();

				if (data?.object?.content) {
					setMovies(data.object.content);

					// If we have a movieId in URL and it exists in our fetched movies, select it
					if (movieIdParam) {
						const movie = data.object.content.find(
							(m) => m.id.toString() === movieIdParam
						);
						if (movie) {
							setSelectedMovie(movie.id);
							fetchCinemas(movie.id);
						}
					}
				} else {
					throw new Error("Unexpected API response format");
				}
			} catch (error) {
				console.error("Error fetching movies:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [movieIdParam]);

	// Fetch cinemas when a movie is selected
	const fetchCinemas = async (movieId) => {
		try {
			setLoading(true);
		
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/cinemas`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch cinemas");
			}

			const data = await response.json();

			if (data?.object) {
				setCinemas(data.object);
			} else {
				throw new Error("Unexpected API response format");
			}
		} catch (error) {
			console.error("Error fetching cinemas:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// Fetch showtimes when a cinema is selected
	const fetchShowtimes = async (movieId, cinemaId) => {
		try {
			setLoading(true);
			// This endpoint might need to be adjusted based on your API
			const response = await getMovieShowtimes(movieId);

			if (!response.ok) {
				throw new Error("Failed to fetch showtimes");
			}

			const data = await response.json();

			if (data?.object?.content) {
				// Filter showtimes for the selected cinema
				const filteredShowtimes = data.object.content.filter(
					(showtime) => showtime.cinema.id.toString() === cinemaId.toString()
				);
				setShowtimes(filteredShowtimes);
			} else {
				throw new Error("Unexpected API response format");
			}
		} catch (error) {
			console.error("Error fetching showtimes:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleMovieSelect = (movieId) => {
		setSelectedMovie(movieId);
		setSelectedCinema(null);
		setSelectedShowtime(null);
		setShowtimes([]);
		fetchCinemas(movieId);
	};

	const handleCinemaSelect = (cinemaId) => {
		setSelectedCinema(cinemaId);
		setSelectedShowtime(null);
		fetchShowtimes(selectedMovie, cinemaId);
	};

	const handleShowtimeSelect = (showtimeId) => {
		setSelectedShowtime(showtimeId);
	};

	const handleContinue = () => {
		if (selectedMovie && selectedCinema && selectedShowtime) {
			router.push(
				`/ticket-type?movieId=${selectedMovie}&cinemaId=${selectedCinema}&showtimeId=${selectedShowtime}`
			);
		}
	};

	if (loading && movies.length === 0) {
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

	return (
		<Container className={styles.stepSessionContainer}>
			<div className={styles.stepIndicator}>
				<div className={`${styles.step} ${styles.active}`}>
					<span className={styles.stepNumber}>1</span>
					<span className={styles.stepLabel}>Seans Seç</span>
				</div>
				<div className={styles.step}>
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

			<p className={styles.instructions}>
				Aşağıda listelenen film, salon ve seans seçeneklerinden tercihini
				yaparak diğer adımlara geçebilirsin.
			</p>

			<Row className={styles.selectionRow}>
				<Col md={4} className={styles.selectionColumn}>
					<div className={styles.selectionBox}>
						<h3>Film Seçimi</h3>
						<div className={styles.tabContainer}>
							<div className={styles.tabButtons}>
								<button className={styles.tabActive}>Tümü</button>
								<button>Favoriler</button>
							</div>

							<div className={styles.movieList}>
								{movies.map((movie) => (
									<div
										key={movie.id}
										className={`${styles.movieItem} ${
											selectedMovie === movie.id ? styles.selected : ""
										}`}
										onClick={() => handleMovieSelect(movie.id)}
									>
										<div className={styles.movieInfo}>
											<h4>{movie.title}</h4>
											<p>{movie.duration} dk</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</Col>

				<Col md={4} className={styles.selectionColumn}>
					<div className={styles.selectionBox}>
						<h3>Sinema Seçimi</h3>
						<div className={styles.tabContainer}>
							<div className={styles.tabButtons}>
								<button className={styles.tabActive}>Tümü</button>
								<button>Favoriler</button>
								<button>Yakınımdakiler</button>
							</div>

							<div className={styles.cinemaList}>
								{selectedMovie ? (
									cinemas.length > 0 ? (
										cinemas.map((cinema) => (
											<div
												key={cinema.id}
												className={`${styles.cinemaItem} ${
													selectedCinema === cinema.id ? styles.selected : ""
												}`}
												onClick={() => handleCinemaSelect(cinema.id)}
											>
												<h4>{cinema.name}</h4>
												<p>{cinema.address}</p>
											</div>
										))
									) : (
										<p className={styles.noDataMessage}>
											Film için uygun sinema bulunamadı.
										</p>
									)
								) : (
									<p className={styles.instructionMessage}>
										Lütfen önce bir film seçin.
									</p>
								)}
							</div>
						</div>
					</div>
				</Col>

				<Col md={4} className={styles.selectionColumn}>
					<div className={styles.selectionBox}>
						<h3>Tarih ve Seans Seçimi</h3>

						<div className={styles.showtimeList}>
							{selectedCinema ? (
								showtimes.length > 0 ? (
									showtimes.map((showtime) => (
										<div
											key={showtime.id}
											className={`${styles.showtimeItem} ${
												selectedShowtime === showtime.id ? styles.selected : ""
											}`}
											onClick={() => handleShowtimeSelect(showtime.id)}
										>
											<div className={styles.showtimeDate}>
												{new Date(showtime.date).toLocaleDateString("tr-TR", {
													day: "numeric",
													month: "long",
													year: "numeric",
												})}
											</div>
											<div className={styles.showtimeTime}>
												{showtime.startTime} - {showtime.endTime}
											</div>
										</div>
									))
								) : (
									<p className={styles.noDataMessage}>
										Seçilen sinema için uygun seans bulunamadı.
									</p>
								)
							) : (
								<p className={styles.instructionMessage}>
									Lütfen önce bir sinema seçin.
								</p>
							)}
						</div>
					</div>
				</Col>
			</Row>

			<div className={styles.bottomBar}>
				<Button
					className={styles.continueButton}
					disabled={!selectedMovie || !selectedCinema || !selectedShowtime}
					onClick={handleContinue}
				>
					Devam Et
				</Button>
			</div>
		</Container>
	);
};

export default StepSessionPage;
