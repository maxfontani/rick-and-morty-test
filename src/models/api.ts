import { Character } from './character';

export type GetAllCharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type ApiState = 
'idle' | 'success' | 'fetching' | 'error';