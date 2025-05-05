"use client";

import Link from "next/link";
import React from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { useState } from "react";

const MovieCard = (props) => {
	const { title, image, id } = props;
	const [imgError, setImgError] = useState(false);

	// Handle different types of image URLs
	let imageUrl = imgError
		? "/placeholder-movie.jpg"
		: typeof image === "string" && image.trim() !== ""
		? image
		: "/placeholder-movie.jpg";

	// If the image URL is from the local backend server, ensure it has the correct base URL
	if (imageUrl.startsWith("/uploads/")) {
		imageUrl = `${process.env.NEXT_PUBLIC_API_URL_WITHOUT_API}${imageUrl}`;
	}

	console.log("Image URL: ", imageUrl);
	return (
		<div className={styles.card}>
			<Link href={`/movies/${id}`}>
				<div className={styles.cardContainer}>
					<div style={{ position: "relative", width: "100%", height: "100%" }}>
						<Image
							src={imageUrl}
							alt={title || "Movie poster"}
							className={styles.cardImage}
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
							fill
							onError={() => setImgError(true)}
							unoptimized={imageUrl.startsWith("http")} // Don't optimize external URLs
						/>
					</div>
					<div className={styles.cardButtons}>
						<Button size="md" className={styles.button}>
							Hemen Bilet Al
						</Button>
						<Button size="md" className={styles.button}>
							İncele
						</Button>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default MovieCard;
