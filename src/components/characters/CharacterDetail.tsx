import type { Character } from "../../types";

const CharacterDetail = ({ character, onBack }: {
  character: Character;
  onBack: () => void;
}) => {
  return (
    <div className="container-sm">
      <button onClick={onBack} className="button button-secondary back-button">
        Back to Characters
      </button>
      
      <div className="detail-container">
        <div className="detail-header">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h1 className="detail-title">{character.name}</h1>
          </div>
        </div>
        
        <div className="grid-2">
          <div className="detail-section">
            <h3 className="detail-section-title">Physical Characteristics</h3>
            <div className="detail-info">
              <div className="detail-info-item">
                <span className="detail-info-label">Height:</span>
                <span className="detail-info-value">{character.height} cm</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Mass:</span>
                <span className="detail-info-value">{character.mass} kg</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Hair Color:</span>
                <span className="detail-info-value">{character.hair_color}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Skin Color:</span>
                <span className="detail-info-value">{character.skin_color}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Eye Color:</span>
                <span className="detail-info-value">{character.eye_color}</span>
              </div>
            </div>
          </div>
          
          <div className="detail-section">
            <h3 className="detail-section-title">Personal Information</h3>
            <div className="detail-info">
              <div className="detail-info-item">
                <span className="detail-info-label">Birth Year:</span>
                <span className="detail-info-value">{character.birth_year}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Gender:</span>
                <span className="detail-info-value">{character.gender}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Films:</span>
                <span className="detail-info-value">{character.films.length}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Starships:</span>
                <span className="detail-info-value">{character.starships.length}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Vehicles:</span>
                <span className="detail-info-value">{character.vehicles.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;