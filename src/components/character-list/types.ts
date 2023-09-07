import { ApiState, GetAllCharactersResponse } from '../../models/api';

export type GetFetchCharactersHandler = (
  setApiState: React.Dispatch<React.SetStateAction<ApiState>>,
  setCharacters: React.Dispatch<React.SetStateAction<GetAllCharactersResponse>>,
  setApiError: React.Dispatch<React.SetStateAction<string>>
) => (page: number, name?: string) => Promise<void>;
