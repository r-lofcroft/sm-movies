const Navigation = ({ currentPage, onNavigate }: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) => (
  <nav className="nav">
    <div className="nav-container">
      <div className="nav-logo">
        <span className="nav-logo-text">Star Wars Explorer</span>
      </div>
      <div className="nav-buttons">
        <button
          onClick={() => onNavigate('movies')}
          className={`nav-button ${currentPage === 'movies' || currentPage === 'movie' ? 'active' : ''}`}
        >
          Movies
        </button>
        <button
          onClick={() => onNavigate('characters')}
          className={`nav-button ${currentPage === 'characters' || currentPage === 'character' ? 'active' : ''}`}
        >
          Characters
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;