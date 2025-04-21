// src/app/movies/page.js
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieList from "../../components/features/movies/MovieList";
import popularMovies from "@/helpers/data/movies.json";
import comingMovies from "@/helpers/data/moviescoming.json";

export default function MoviesPage() {
  return (
    <main>
      <Container className="py-5">
        <Row className="my-4">
          <Col>
            <MovieList title="Vizyondakiler" movies={popularMovies} />
          </Col>
        </Row>

        <Row className="my-4">
          <Col>
            <MovieList
              title="Yakında Vizyona Girecekler"
              movies={comingMovies}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
