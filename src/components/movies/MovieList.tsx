import { useEffect, useState } from "react";
import { StarWarsApi } from "../../services/api";
import type { Film } from "../../types";
import Loader from "../loader/Loader";

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
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1 className="title">Star Wars Movies</h1>
      <div className="grid">
        {films.map((film) => (
          <div key={film.episode_id} className="card" onClick={() => onSelectMovie(film)}>
            <div className="card-header">
              <h2 className="card-title">Episode {film.episode_id}</h2>
            </div>
            <h3 className="card-subtitle">{film.title}</h3>
            <p className="card-text">{film.opening_crawl.substring(0, 150)}...</p>
            <div className="card-footer">
              <span>Director: {film.director}</span>
              <span>{new Date(film.release_date).getFullYear()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;