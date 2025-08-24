import styled, { keyframes } from "styled-components";
import type { Character } from "../../types";

interface CharactersListProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

// Keyframes
const twinkle = keyframes`
  0% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const StarWarsContainer = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: ${twinkle} 4s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: -1;
  }
`;

const EmptyContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  transform: rotateX(10deg);
  perspective: 400px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  transform: rotateX(15deg);
  transform-origin: 50% 100%;
  perspective: 600px;

  @media (max-width: 768px) {
    padding: 1rem;
    transform: rotateX(10deg);
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #fbbf24;
  text-align: center;
  margin: 0 0 3rem 0;
  font-weight: bold;
  letter-spacing: 6px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 3px;
    margin-bottom: 2rem;
  }
`;

const CharacterCount = styled.span`
  color: #fbbf24;
  font-size: 0.6em;
  font-weight: normal;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
`;

const EmptyState = styled.div`
  animation: ${fadeIn} 1s ease-out 0.5s both;
`;

const EmptyTitle = styled.p`
  font-size: 2rem;
  color: #fbbf24;
  margin: 0 0 1rem 0;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  color: #fbbf24;
  margin: 0;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CharacterCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #fbbf24;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 232, 31, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: scale(1.05) translateZ(10px);
    border-color: #fbbf24;
    background: rgba(75, 213, 238, 0.1);
    box-shadow: 0 10px 30px rgba(75, 213, 238, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98) translateZ(5px);
  }
`;

const CharacterHeader = styled.div`
  margin-bottom: 1rem;
`;

const CharacterName = styled.h2`
  font-size: 1.5rem;
  color: #fbbf24;
  margin: 0 0 0 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-left: 0;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(75, 213, 238, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #fbbf24;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
`;

const DetailValue = styled.span`
  color: #E0E0E0;
  font-size: 0.9rem;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
`;

const CharactersList = ({ characters, onSelectCharacter }: CharactersListProps) => {
  if (characters.length === 0) {
    return (
      <StarWarsContainer>
        <EmptyContainer>
          <Title>CHARACTERS</Title>
          <EmptyState>
            <EmptyTitle>No characters found</EmptyTitle>
            <EmptyText>Visit some movies to discover characters!</EmptyText>
          </EmptyState>
        </EmptyContainer>
      </StarWarsContainer>
    );
  }

  return (
    <StarWarsContainer>
      <Container>
        <Title>
          CHARACTERS <CharacterCount>({characters.length})</CharacterCount>
        </Title>
        <Grid>
          {characters.map((character, index) => (
            <CharacterCard 
              key={character.url || index} 
              onClick={() => onSelectCharacter(character)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CharacterHeader>
                <CharacterName>{character.name}</CharacterName>
              </CharacterHeader>
              <DetailInfo>
                <DetailItem>
                  <DetailLabel>Height:</DetailLabel>
                  <DetailValue>{character.height}cm</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Mass:</DetailLabel>
                  <DetailValue>{character.mass}kg</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Gender:</DetailLabel>
                  <DetailValue>{character.gender}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Birth Year:</DetailLabel>
                  <DetailValue>{character.birth_year}</DetailValue>
                </DetailItem>
              </DetailInfo>
            </CharacterCard>
          ))}
        </Grid>
      </Container>
    </StarWarsContainer>
  );
};

export default CharactersList;