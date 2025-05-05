"use client";

import MovieList from "../components/features/movies/MovieList";
import Slider from "@/components/ui/slider/slider";
import HomeHallSection from "@/components/specialhalls/HomeHallsection";
import data from "@/helpers/data/movies.json";
import { getAllMoviesByPage } from "@/services/movie-service";
import { useEffect, useState } from "react";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState(data);

	useEffect(() => {
		fetchMovieData();
	}, []);
	const fetchMovieData = async () => {
		try {
			setLoading(true);

			const movieResponse = await getAllMoviesByPage();

			if (!movieResponse.ok) {
				throw new Error("Failed to fetch movie data");
			}

			const responseData = await movieResponse.json();

			if (
				responseData &&
				responseData.object &&
				responseData.object.content &&
				Array.isArray(responseData.object.content)
			) {
				setMovieData(responseData.object.content);
			} else {
				console.error("Unexpected API response format:", responseData);
			}
		} catch (err) {
			console.error("Error fetching movie data:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<Slider />
			<div className="container my-5">
				<h1>Welcome to Our Cinema</h1>
				<p>Discover the magic of movies</p>
				<MovieList movies={movieData} />
				<HomeHallSection />
			</div>
		</main>
	);
}
