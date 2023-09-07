import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounced } from '../../hooks/use-debounced';
import { CharacterCard, NavBar, Spinner } from '../';
import { getFetchCharactersHandler, sortCharactersByName } from './utils';
import { SEARCH_DEBOUNCE_MS } from './constants';
import { ApiState, GetAllCharactersResponse } from '../../models/api';
import s from './index.module.css';

export const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [characters, setCharacters] = useState<GetAllCharactersResponse>(null);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [apiError, setApiError] = useState<string>('');
  const [apiState, setApiState] = useState<ApiState>('idle');

  // Always sort the characters by name
  const sortedCharacters = useMemo(
    () => sortCharactersByName(characters?.results),
    [characters]
  );

  const getChangePageHandler = useCallback(
    (direction: 'prev' | 'next') => () =>
      direction === 'next'
        ? setPage(page => page + 1)
        : setPage(page => page - 1),
    []
  );

  const fetchCharacters = useCallback(
    getFetchCharactersHandler(setApiState, setCharacters, setApiError),
    []
  );

  const onChangeSearch = useDebounced(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    SEARCH_DEBOUNCE_MS
  );

  useEffect(() => {
    // fetch initial character list data
    fetchCharacters(page, search);
  }, []);

  // Compare props to avoid useUffect's extra re-renders
  if (prevSearch !== search || prevPage !== page) {
    setPrevPage(page);
    setPrevSearch(search);
    fetchCharacters(page, search);
  }

  return (
    <div className={s.wrapper}>
      <NavBar
        paginationInfo={characters?.info}
        getChangePageHandler={getChangePageHandler}
        onChangeSearch={onChangeSearch}
      />
      {apiState === 'fetching' && <Spinner />}
      {apiState === 'error' && <div className={s.error}>{apiError}</div>}
      {apiState === 'success' && (
        <div className={s.list}>
          {sortedCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};
