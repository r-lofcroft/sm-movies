import styled from "styled-components";
import type { Character } from "../../types";

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

const CharacterDetail = ({ character, onBack }: {
  character: Character;
  onBack: () => void;
}) => {
  return (
    <Container>
      <BackButton onClick={onBack}>
        Back to Characters
      </BackButton>
      
      <DetailContainer>
        <DetailHeader>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <DetailTitle>{character.name}</DetailTitle>
          </div>
        </DetailHeader>
        
        <Grid>
          <DetailSection>
            <DetailSectionTitle>Physical Characteristics</DetailSectionTitle>
            <DetailInfo>
              <DetailInfoItem>
                <DetailInfoLabel>Height:</DetailInfoLabel>
                <DetailInfoValue>{character.height} cm</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Mass:</DetailInfoLabel>
                <DetailInfoValue>{character.mass} kg</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Hair Color:</DetailInfoLabel>
                <DetailInfoValue>{character.hair_color}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Skin Color:</DetailInfoLabel>
                <DetailInfoValue>{character.skin_color}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Eye Color:</DetailInfoLabel>
                <DetailInfoValue>{character.eye_color}</DetailInfoValue>
              </DetailInfoItem>
            </DetailInfo>
          </DetailSection>
          
          <DetailSection>
            <DetailSectionTitle>Personal Information</DetailSectionTitle>
            <DetailInfo>
              <DetailInfoItem>
                <DetailInfoLabel>Birth Year:</DetailInfoLabel>
                <DetailInfoValue>{character.birth_year}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Gender:</DetailInfoLabel>
                <DetailInfoValue>{character.gender}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Films:</DetailInfoLabel>
                <DetailInfoValue>{character.films.length}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Starships:</DetailInfoLabel>
                <DetailInfoValue>{character.starships.length}</DetailInfoValue>
              </DetailInfoItem>
              <DetailInfoItem>
                <DetailInfoLabel>Vehicles:</DetailInfoLabel>
                <DetailInfoValue>{character.vehicles.length}</DetailInfoValue>
              </DetailInfoItem>
            </DetailInfo>
          </DetailSection>
        </Grid>
      </DetailContainer>
    </Container>
  );
};

export default CharacterDetail;