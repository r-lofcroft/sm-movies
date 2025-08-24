import styled from "styled-components";

const Nav = styled.nav`
  background-color: #000;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLogoText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.$active ? '#fbbf24' : 'transparent'};
  color: ${props => props.$active ? '#000' : '#ccc'};
  font-size: 0.9rem;

  &:hover {
    color: #fff;
    background-color: ${props => props.$active ? '#fbbf24' : '#333'};
  }
`;

const Navigation = ({ currentPage, onNavigate }: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) => (
  <Nav>
    <NavContainer>
      <NavLogo>
        <NavLogoText>Star Wars Explorer</NavLogoText>
      </NavLogo>
      <NavButtons>
        <NavButton
            onClick={() => onNavigate('movies')}
            $active={currentPage === 'movies' || currentPage === 'movie'}
            >
            Movies
            </NavButton>
            <NavButton
            onClick={() => onNavigate('characters')}
            $active={currentPage === 'characters' || currentPage === 'character'}
            >
            Characters
            </NavButton>
      </NavButtons>
    </NavContainer>
  </Nav>
);

export default Navigation;