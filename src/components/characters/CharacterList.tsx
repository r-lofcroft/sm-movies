import type { Character } from "../../types";

const CharactersList = ({ characters, onSelectCharacter }: {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}) => {
  if (characters.length === 0) {
    return (
      <div className="container-sm">
        <h1 className="title">Characters</h1>
        <div className="empty-state">
          <p className="empty-state-title">No characters found</p>
          <p className="empty-state-text">Visit some movies to discover characters!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">
        Characters <span className="character-count">({characters.length})</span>
      </h1>
      <div className="grid">
        {characters.map((character, index) => (
          <div key={index} className="card" onClick={() => onSelectCharacter(character)}>
            <div className="card-character-header">
              <h2 className="card-title" style={{marginLeft: '0.75rem'}}>{character.name}</h2>
            </div>
            <div className="detail-info">
              <div className="detail-info-item">
                <span className="detail-info-label">Height:</span>
                <span className="detail-info-value">{character.height}cm</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Mass:</span>
                <span className="detail-info-value">{character.mass}kg</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Gender:</span>
                <span className="detail-info-value">{character.gender}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Birth Year:</span>
                <span className="detail-info-value">{character.birth_year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersList;