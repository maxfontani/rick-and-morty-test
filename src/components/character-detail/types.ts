import { ApiState } from '../../models/api';
import { Character } from '../../models/character';

export type GetFetchCharacterHandler = (
  setApiState: React.Dispatch<React.SetStateAction<ApiState>>,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>,
  setApiError: React.Dispatch<React.SetStateAction<string>>
) => (page: number, name?: string) => Promise<void>;
