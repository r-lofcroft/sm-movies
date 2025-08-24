import { useEffect, useState } from "react";
import styled from "styled-components";
import { StarWarsApi } from "../../services/api";
import type { Film } from "../../types";
import Loader from "../loader/Loader";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #111;
  border: 1px solid #333;
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  transform: translateY(0);

  &:hover {
    border-color: #fbbf24;
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #fbbf24;
`;

const CardSubtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #999;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

const MoviesList = ({ onSelectMovie }: { onSelectMovie: (film: Film) => void }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        const filmsData = await StarWarsApi.getFilms();
        setFilms(filmsData);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>Star Wars Movies</Title>
      <Grid>
        {films.map((film) => (
          <Card key={film.episode_id} onClick={() => onSelectMovie(film)}>
            <CardHeader>
              <CardTitle>Episode {film.episode_id}</CardTitle>
            </CardHeader>
            <CardSubtitle>{film.title}</CardSubtitle>
            <CardText>{film.opening_crawl.substring(0, 150)}...</CardText>
            <CardFooter>
              <span>Director: {film.director}</span>
              <span>{new Date(film.release_date).getFullYear()}</span>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default MoviesList;