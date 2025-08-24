import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { Character, Film } from "../../types";
import { StarWarsApi } from "../../services/api";
import Loader from "../loader/Loader";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #444;
  }
`;

const DetailContainer = styled.div`
  background-color: #111;
  border: 1px solid #333;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const DetailTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #fbbf24;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const DetailYear = styled.span`
  color: #999;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DetailSection = styled.div`
  margin-bottom: 2rem;
`;

const DetailSectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fbbf24;
`;

const DetailText = styled.p`
  color: #ccc;
  line-height: 1.7;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailInfoItem = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }
`;

const DetailInfoLabel = styled.span`
  color: #fbbf24;
  font-weight: 600;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const DetailInfoValue = styled.span`
  color: #fff;
  text-transform: capitalize;
`;

const CharactersGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CharacterCard = styled.div`
  background-color: #222;
  border: 1px solid #444;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const CharacterCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CharacterName = styled.span`
  font-weight: 500;
  margin-left: 0.5rem;
`;

const CharacterCardDetails = styled.div`
  font-size: 0.75rem;
  color: #999;

  > div {
    margin-bottom: 0.25rem;
  }
`;

const LoadingCard = styled.div`
  background-color: #222;
  border: 2px dashed #444;
  border-radius: 0.5rem;
  padding: 1rem;
  opacity: 0.5;
  text-align: center;
`;

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
    <Container>
      <BackButton onClick={onBack}>
        Back to Movies
      </BackButton>
      
      <DetailContainer>
        <DetailHeader>
          <DetailTitle>Episode {film.episode_id}: {film.title}</DetailTitle>
          <DetailYear>{new Date(film.release_date).getFullYear()}</DetailYear>
        </DetailHeader>
        
        <Grid>
          <DetailSection>
            <DetailSectionTitle>Opening Crawl</DetailSectionTitle>
            <DetailText>{film.opening_crawl}</DetailText>
          </DetailSection>
          
          <DetailInfo>
            <DetailInfoItem>
              <DetailInfoLabel>Director:</DetailInfoLabel>
              <DetailInfoValue>{film.director}</DetailInfoValue>
            </DetailInfoItem>
            <DetailInfoItem>
              <DetailInfoLabel>Producer:</DetailInfoLabel>
              <DetailInfoValue>{film.producer}</DetailInfoValue>
            </DetailInfoItem>
            <DetailInfoItem>
              <DetailInfoLabel>Release Date:</DetailInfoLabel>
              <DetailInfoValue>{new Date(film.release_date).toLocaleDateString()}</DetailInfoValue>
            </DetailInfoItem>
          </DetailInfo>
        </Grid>

        <DetailSection>
          <DetailSectionTitle>
            Characters ({film.characters.length})
            {loading && (
              <span style={{ color: '#999', fontSize: '0.9rem', marginLeft: '1rem' }}>
                Loading {Math.round(loadingProgress)}%...
              </span>
            )}
          </DetailSectionTitle>
          
          {characters.length === 0 && loading ? (
            <Loader />
          ) : (
            <CharactersGrid>
              {characters.map((character, index) => (
                <CharacterCard key={index}>
                  <CharacterCardHeader>
                    <CharacterName>{character.name}</CharacterName>
                  </CharacterCardHeader>
                  <CharacterCardDetails>
                    <div>Height: {character.height}cm</div>
                    <div>Gender: {character.gender}</div>
                  </CharacterCardDetails>
                </CharacterCard>
              ))}
              
              {loading && characters.length > 0 && (
                <LoadingCard>
                  Loading more...
                </LoadingCard>
              )}
            </CharactersGrid>
          )}
        </DetailSection>
      </DetailContainer>
    </Container>
  );
};

export default MovieDetail;
