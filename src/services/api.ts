import type { Character, Film } from "../types";

export class StarWarsApi {
  private static cache = new Map<string, any>();

  private static baseURL = "https://swapi.dev/api";
  private static fallbackURL = "https://ci-swapi.herokuapp.com/api";

  static async fetchWithCache<T>(url: string): Promise<T> {
    if (this.cache.has(url)) {
      return this.cache.get(url) as T;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Primary API error: ${response.status}`);
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    } catch (err) {
      console.warn(`Primary fetch failed (${url}), trying fallback…`, err);

      const fallbackUrl = url.replace(this.baseURL, this.fallbackURL);
      const response = await fetch(fallbackUrl);
      if (!response.ok) {
        throw new Error(`Fallback API error: ${response.status}`);
      }
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    }
  }

  static async getFilms(): Promise<Film[]> {
    const data = await this.fetchWithCache<{ results: Film[] }>(`${this.baseURL}/films/`);
    return data.results.sort((a, b) => a.episode_id - b.episode_id);
  }

  static async getCharacter(url: string): Promise<Character> {
    return this.fetchWithCache<Character>(url);
  }

 static async getCharacters(urls: string[]): Promise<Character[]> {
    // Batch load characters with concurrency limit
    const batchSize = 5; // Load 5 characters at a time
    const results: Character[] = [];
    
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchPromises = batch.map(url => this.getCharacter(url));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    return results;
  }

  // Load characters progressively
  static async getCharactersProgressive(
    urls: string[], 
    onProgress: (characters: Character[], isComplete: boolean) => void
  ): Promise<Character[]> {
    const allCharacters: Character[] = [];
    const batchSize = 3;

    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchPromises = batch.map(url => this.getCharacter(url));
      const batchResults = await Promise.all(batchPromises);
      
      allCharacters.push(...batchResults);
      onProgress(allCharacters, i + batchSize >= urls.length);
    }

    return allCharacters;
  }
}
