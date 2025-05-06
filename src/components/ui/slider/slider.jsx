// Updated Slider.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaClock } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

import { getInTheatersMovies } from "@/services/movie-service";

const Slider = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchMovieData();
	}, []);

	const fetchMovieData = async () => {
		try {
			setLoading(true);
			const movieResponse = await getInTheatersMovies();

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
				setMovies(responseData.object.content);
			} else {
				console.error("Unexpected API response format:", responseData);
				setMovies([]);
			}
		} catch (err) {
			console.error("Error fetching movie data:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="slider-wrapper">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				pagination={{
					el: ".swiper-pagination",
					clickable: true,
				}}
				className="swiper-container"
			>
				{movies.map((movie) => {
					let imageUrl = movie.posterUrl || movie.image;
					if (imageUrl && imageUrl.startsWith("/uploads/")) {
						imageUrl = `${process.env.NEXT_PUBLIC_API_URL_WITHOUT_API}${imageUrl}`;
					}

					return (
						<SwiperSlide key={movie.id}>
							<div className="slide-content">
								<div
									className="hero-image"
									style={{ backgroundImage: `url(${imageUrl})` }}
								>
									{/* The key is this empty div that contains the background image */}
								</div>

								<div className="slide-inner">
									<h3>{movie.title || "Untitled Movie"}</h3>
									<p className="description">
										{movie.summary || "No description available"}
									</p>

									<div className="movie-meta">
										{movie.duration && (
											<span className="duration">
												<FaClock /> {movie.duration} min
											</span>
										)}
									</div>

									<div className="buttons">
										<Link
											href={`/seat-selection?movieId=${movie.id}`}
											className="btn btn-buy"
										>
											Hemen Bilet Al
										</Link>
										<Link
											href={`/movies/${movie.id}`}
											className="btn btn-detail"
										>
											İncele
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<div className="swiper-pagination"></div>
			</Swiper>
		</div>
	);
};

export default Slider;
