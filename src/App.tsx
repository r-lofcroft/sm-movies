import { useState } from "react";
import type { Character, Film } from "./types";
import MoviesList from "./components/movies/MovieList";
import MovieDetail from "./components/movies/MovieDetail";
import Navigation from "./components/navigation/Navigation";
import CharactersList from "./components/characters/CharacterList";
import CharacterDetail from "./components/characters/CharacterDetail";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('movies');
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [discoveredCharacters, setDiscoveredCharacters] = useState<Character[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedFilm(null);
    setSelectedCharacter(null);
  };

  const handleSelectMovie = (film: Film) => {
    setSelectedFilm(film);
    setCurrentPage('movie');
  };

  const handleAddCharacters = (characters: Character[]) => {
    setDiscoveredCharacters(prev => {
      const existingNames = new Set(prev.map(char => char.name));
      const newCharacters = characters.filter(char => !existingNames.has(char.name));
      return [...prev, ...newCharacters];
    });
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentPage('character');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'movies':
        return <MoviesList onSelectMovie={handleSelectMovie} />;
      case 'movie':
        return selectedFilm ? (
          <MovieDetail
            film={selectedFilm}
            onBack={() => handleNavigate('movies')}
            onAddCharacters={handleAddCharacters}
          />
        ) : null;
      case 'characters':
        return (
          <CharactersList
            characters={discoveredCharacters}
            onSelectCharacter={handleSelectCharacter}
          />
        );
      case 'character':
        return selectedCharacter ? (
          <CharacterDetail
            character={selectedCharacter}
            onBack={() => handleNavigate('characters')}
          />
        ) : null;
      default:
        return <MoviesList onSelectMovie={handleSelectMovie} />;
    }
  };

  return (
    <>
      <div className="app">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        {renderCurrentPage()}
      </div>
    </>
  );
};

export default App;