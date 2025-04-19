// src/app/page.js
import React from "react";
import MovieList from "../components/features/movies/MovieList";
import Slider from "@/components/ui/slider/slider";
import HomeHallSection from "@/components/specialhalls/HomeHallsection";


export default function Home() {
  return (
    <main>
      <Slider />
      <div className="container my-5">
        <h1>Welcome to Our Cinema</h1>
        <p>Discover the magic of movies</p>
        <MovieList />
        <HomeHallSection />
        
      </div>
    </main>
  );
}
