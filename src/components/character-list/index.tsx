import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounced } from '../../hooks/use-debouned';
import { fetchAllCharacters } from '../../assets/utils/api';
import { CharacterCard, NavBar, Spinner } from '../';
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
  const sortedCharacters = useMemo(() => {
    if (!Array.isArray(characters?.results)) return [];

    const charactersCopy = [...characters?.results];

    return (
      charactersCopy?.sort((a, b) => a.name.localeCompare(b.name)) ||
      []
    );
  }, [characters]);

  const getChangePageHandler = useCallback(
    (direction: 'prev' | 'next') => () =>
      direction === 'next'
        ? setPage(page => page + 1)
        : setPage(page => page - 1),
    []
  );

  const onChangeSearch = useDebounced(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }
  );

  const fetchCharacters = useCallback(async (page: number, name?: string) => {
    try {
      setApiState('fetching');

      const characters = await fetchAllCharacters(page, name);

      setCharacters(characters);
      setApiState('success');
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof Error ? error : 'Oops, something went wrong';

      setApiState('error');
      setApiError(errorMessage.toString());
    }
  }, []);

  useEffect(() => {
    fetchCharacters(page);
  }, [fetchCharacters]);

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
