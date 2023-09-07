import { fetchAllCharacters } from '../../assets/utils/api';
import { DEFAULT_API_ERROR } from '../../assets/utils/api/constants';
import { Character } from '../../models/character';
import { GetFetchCharactersHandler } from './types';

export function sortCharactersByName(characters: Character[]) {
  if (!Array.isArray(characters)) return [];

  const charactersCopy = [...characters];

  return charactersCopy?.sort((a, b) => a.name.localeCompare(b.name)) || [];
}

export const getFetchCharactersHandler: GetFetchCharactersHandler =
  (setApiState, setCharacters, setApiError) =>
  async (page: number, name?: string) => {
    try {
      setApiState('fetching');

      const characters = await fetchAllCharacters(page, name);

      setCharacters(characters);
      setApiState('success');
    } catch (error) {
      console.error(error);

      const errorMessage = error instanceof Error ? error : DEFAULT_API_ERROR;

      setApiState('error');
      setApiError(errorMessage.toString());
    }
  };
