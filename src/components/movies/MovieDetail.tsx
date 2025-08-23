import { useEffect, useRef, useState } from "react";
import type { Character, Film } from "../../types";
import { StarWarsApi } from "../../services/api";
import Loader from "../loader/Loader";

const MovieDetail = ({ film, onBack, onAddCharacters }: {
  film: Film;
  onBack: () => void;
  onAddCharacters: (characters: Character[]) => void;
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const onAddCharactersRef = useRef(onAddCharacters);
  onAddCharactersRef.current = onAddCharacters;

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setCharacters([]);

        await StarWarsApi.getCharactersProgressive(
          film.characters,
          (progressCharacters, isComplete) => {
            setCharacters(progressCharacters);
            setLoadingProgress((progressCharacters.length / film.characters.length) * 100);
            
            if (isComplete) {
              onAddCharacters(progressCharacters);
              setLoading(false);
            }
          }
        );
      } catch (err) {
        console.error('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();

  }, [film]);

  return (
    <div className="container-sm">
      <button onClick={onBack} className="button button-secondary back-button">
        Back to Movies
      </button>
      
      <div className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">Episode {film.episode_id}: {film.title}</h1>
          <span className="detail-year">{new Date(film.release_date).getFullYear()}</span>
        </div>
        
        <div className="grid-2">
          <div className="detail-section">
            <h3 className="detail-section-title">Opening Crawl</h3>
            <p className="detail-text">{film.opening_crawl}</p>
          </div>
          
          <div className="detail-info">
            <div className="detail-info-item">
              <span className="detail-info-label">Director:</span>
              <span className="detail-info-value">{film.director}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Producer:</span>
              <span className="detail-info-value">{film.producer}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Release Date:</span>
              <span className="detail-info-value">{new Date(film.release_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3 className="detail-section-title">
            Characters ({film.characters.length})
            {loading && (
              <span style={{ color: '#999', fontSize: '0.9rem', marginLeft: '1rem' }}>
                Loading {Math.round(loadingProgress)}%...
              </span>
            )}
          </h3>
          
          {characters.length === 0 && loading ? (
            <Loader />
          ) : (
            <div className="grid-characters">
              {characters.map((character, index) => (
                <div key={index} className="card-sm">
                  <div className="card-character-header">
                    <span className="card-character-name">{character.name}</span>
                  </div>
                  <div className="card-details">
                    <div>Height: {character.height}cm</div>
                    <div>Gender: {character.gender}</div>
                  </div>
                </div>
              ))}
              
              {loading && characters.length > 0 && (
                <div className="card-sm" style={{ opacity: 0.5, border: '2px dashed #444' }}>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    Loading more...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;