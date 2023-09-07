import { fetchCharacterById } from '../../assets/utils/api';
import { DEFAULT_API_ERROR } from '../../assets/utils/api/constants';
import { GetFetchCharacterHandler } from './types';

export const getFetchCharacterHandler: GetFetchCharacterHandler =
  (setApiState, setCharacter, setApiError) => async (characterId: number) => {
    try {
      setApiState('fetching');

      const character = await fetchCharacterById(characterId);

      setCharacter(character);
      setApiState('success');
    } catch (error) {
      console.error(error);

      const errorMessage = error instanceof Error ? error : DEFAULT_API_ERROR;

      setApiState('error');
      setApiError(errorMessage.toString());
    }
  };
