"use client";

import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieList from "../../components/features/movies/MovieList";
import { appConfig } from "@/helpers/config";
// Fallback data in case the API fails
import popularMovies from "@/helpers/data/movies.json";
import comingMovies from "@/helpers/data/moviescoming.json";

export default function MoviesPage() {
	const [inTheaters, setInTheaters] = useState(popularMovies);
	const [comingSoon, setComingSoon] = useState(comingMovies);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);

				// Fetch movies in theaters
				const inTheatersResponse = await fetch(
					`${appConfig.apiURL}${appConfig.movie.inTheaters}`
				);

				// Fetch coming soon movies
				const comingSoonResponse = await fetch(
					`${appConfig.apiURL}${appConfig.movie.comingSoon}`
				);

				if (!inTheatersResponse.ok || !comingSoonResponse.ok) {
					throw new Error("Failed to fetch movies");
				}

				// Parse JSON responses
				const inTheatersData = await inTheatersResponse.json();
				const comingSoonData = await comingSoonResponse.json();

				// Process data to match MovieCard expected props
				if (inTheatersData.object?.content) {
					const processedInTheaters = inTheatersData.object.content.map(
						(movie) => ({
							id: movie.id,
							title: movie.title,
							image: movie.posterUrl || "/placeholder-movie.jpg",
							// Add any other props your MovieList/MovieCard needs
						})
					);
					setInTheaters(processedInTheaters);
				}

				if (comingSoonData.object?.content) {
					const processedComingSoon = comingSoonData.object.content.map(
						(movie) => ({
							id: movie.id,
							title: movie.title,
							image: movie.posterUrl || "/placeholder-movie.jpg",
							// Add any other props your MovieList/MovieCard needs
						})
					);
					setComingSoon(processedComingSoon);
				}
			} catch (error) {
				console.error("Error fetching movies:", error);
				setError(error.message);
				// Keep using fallback data on error
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	return (
		<main>
			<Container className="py-5">
				{loading ? (
					<div className="text-center py-5">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : error ? (
					<div className="alert alert-danger" role="alert">
						{error} - Using fallback data
					</div>
				) : (
					<>
						<Row className="my-4">
							<Col>
								<MovieList title="Vizyondakiler" movies={inTheaters} />
							</Col>
						</Row>

						<Row className="my-4">
							<Col>
								<MovieList
									title="Yakında Vizyona Girecekler"
									movies={comingSoon}
								/>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</main>
	);
}
