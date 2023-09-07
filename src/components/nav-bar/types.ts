import { GetAllCharactersResponse } from '../../models/api';

export type Props = {
  paginationInfo: GetAllCharactersResponse['info'];
  getChangePageHandler: (direction: 'next' | 'prev') => () => void;
  onChangeSearch: (...args: any[]) => void;
};
