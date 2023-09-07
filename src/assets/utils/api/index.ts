import { API_BASE_URL, URLS } from './constants';
import { Character } from '../../../models/character';
import { GetAllCharactersResponse } from '../../../models/api';

export const fetchAllCharacters = async (page: number, name = '') => {
  const response = await fetch(
    `${API_BASE_URL}/${URLS.GET_CHARACTER}?page=${page}&name=${name}`
  );
  const data = (await response.json()) as
    | GetAllCharactersResponse
    | { error: string };

  if ('error' in data && typeof data.error === 'string')
    throw new Error(data.error);
  if (!('results' in data) || !Array.isArray(data.results))
    throw new Error('Invalid API response');

  return data;
};

export const fetchCharacterById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${URLS.GET_CHARACTER}/${id}`);
  const data = (await response.json()) as Character;

  if (!data) throw new Error('Invalid API response');

  return data;
};
