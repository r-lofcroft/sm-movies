
import './App.css'
import { StarWarsApi } from './services/api'


function App() {
 const testGetFilms = async () => {
    console.log('Testing getFilms()...');
    try {
      const films = await StarWarsApi.getFilms();
      console.log('Films loaded:', films);
    } catch (error) {
      console.error('Error loading films:', error);
    }
  };

  const testGetCharacter = async () => {
    console.log('Testing getCharacter()...');
    try {
      const character = await StarWarsApi.getCharacter('https://swapi.dev/api/people/1/');
      console.log('Character loaded:', character);
    } catch (error) {
      console.error('Error loading character:', error);
    }
  };

  const testGetCharacters = async () => {
    console.log('👥 Testing getCharacters()...');
    try {
      const urls = [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/3/'
      ];
      const characters = await StarWarsApi.getCharacters(urls);
      console.log('Characters loaded:', characters);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  const testCaching = async () => {
    console.log('Testing caching calling same character twice...');
    try {
      console.log('First call:');
      await StarWarsApi.getCharacter('https://swapi.dev/api/people/4/');
      console.log('Second call (should be cached):');
      await StarWarsApi.getCharacter('https://swapi.dev/api/people/4/');
    } catch (error) {
      console.error('Error testing cache:', error);
    }
  };

  return (
    <div style={{ padding: '20px'}}>
      <h1>Star Wars API Demo</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        <button onClick={testGetFilms}>
          Test getFilms()
        </button>
        
        <button onClick={testGetCharacter}>
          Test getCharacter()
        </button>
        
        <button onClick={testGetCharacters}>
          Test getCharacters()
        </button>
        
        <button onClick={testCaching}>
          Test Caching
        </button>
      </div>
    </div>
  );
};


export default App
