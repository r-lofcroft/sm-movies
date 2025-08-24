import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16rem;
  padding: 2rem;
`;

const LoaderSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid #fbbf24;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <LoaderContainer>
    <LoaderSpinner />
  </LoaderContainer>
);

export default Loader;