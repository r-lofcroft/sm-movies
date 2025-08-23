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
    const promises = urls.map(url => this.getCharacter(url));
    return Promise.all(promises);
  }
}


