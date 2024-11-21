export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    game = 'game',
  }
  
  export interface SearchResult {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    Type: string;
  }
  
  export interface SearchResponse {
    Search?: SearchResult[];
    Error?: string;
  }
  
  export interface DetailsResult {
    Genre: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    imdbRating: string;
    Director: string;
    Actors: string;
    Website: string;
  }
  
  export const useApi = () => {
    const url = 'https://www.omdbapi.com/';
    const apiKey = 'db4c4cef';
  
    const searchData = async (
      title: string,
      type: SearchType
    ): Promise<SearchResponse> => {
      const response = await fetch(
        `${url}?s=${encodeURIComponent(title)}&type=${type}&apikey=${apiKey}`
      );
      return response.json();
    };
  
    const getDetails = async (id: string): Promise<DetailsResult> => {
      const response = await fetch(
        `${url}?i=${id}&plot=full&apikey=${apiKey}`
      );
      return response.json();
    };
  
    return {
      searchData,
      getDetails,
    };
  };
  
  export default useApi;
  