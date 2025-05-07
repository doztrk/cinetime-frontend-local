"use client";

import React, { useState, useEffect, use } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { getMovieById } from "@/services/movie-service";
import Link from "next/link";

export default function MovieDetailPage({ params }) {
	const unwrappedParams = use(params);
	const movieId = unwrappedParams.id;

	const router = useRouter();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imgError, setImgError] = useState(false);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				setLoading(true);
				const movieResponse = await getMovieById(movieId);

				if (!movieResponse.ok) {
					throw new Error(`HTTP error! Status: ${movieResponse.status}`);
				}

				const data = await movieResponse.json();

				if (data && data.object) {
					setMovie(data.object);
				} else {
					throw new Error("Failed to fetch movie details");
				}
			} catch (err) {
				console.error("Error fetching movie:", err);
				setError(
					err.message || "An error occurred while fetching the movie data"
				);
			} finally {
				setLoading(false);
			}
		};

		if (movieId) {
			fetchMovie();
		}
	}, [movieId]);

	const handleBuyTickets = () => {
		router.push(`/seat-selection?movieId=${movieId}`);
	};

	const getImageUrl = () => {
		if (imgError || !movie?.posterUrl) {
			return "/images/placeholder.jpg";
		}

		let imageUrl = movie.posterUrl;

		if (imageUrl.startsWith("/uploads/")) {
			return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
		}

		return imageUrl;
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
			<Container className="py-5">
				<Alert variant="danger">Error: {error}</Alert>
			</Container>
		);
	}

	if (!movie) {
		return (
			<Container className="py-5">
				<Alert variant="warning">Movie not found</Alert>
			</Container>
		);
	}

	return (
		<main>
			<Container className="py-5">
				<Row>
					<Col md={4}>
						<img
							src={getImageUrl()}
							alt={movie.title}
							className="img-fluid rounded"
							style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
							onError={() => setImgError(true)}
						/>
					</Col>
					<Col md={8}>
						<h1>{movie.title}</h1>
						{movie.rating && <p className="lead">Rating: {movie.rating}/10</p>}
						<p>
							<strong>Director:</strong> {movie.director}
						</p>
						<p>
							<strong>Cast:</strong> {movie.cast?.join(", ")}
						</p>
						<p>
							<strong>Release Date:</strong>{" "}
							{new Date(movie.releaseDate).toLocaleDateString()}
						</p>
						<p>
							<strong>Duration:</strong> {movie.duration} min
						</p>
						<p>
							<strong>Genre:</strong> {movie.genre?.join(", ")}
						</p>
						<p>
							<strong>Format:</strong> {movie.formats?.join(", ")}
						</p>
						<div className="my-4">
							<h3>Synopsis</h3>
							<p>{movie.summary}</p>
						</div>
						<Link href={`/step-session?movieId=${movieId}`}>
							<Button variant="primary" size="lg">
								Buy Tickets
							</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</main>
	);
}
