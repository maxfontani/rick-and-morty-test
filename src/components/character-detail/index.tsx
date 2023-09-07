import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../';
import { fetchCharacterById } from '../../assets/utils/api';
import { INFO_KEYS } from './constants';
import { ApiState } from '../../models/api';
import { Character } from '../../models/character';
import s from './index.module.css';

export const CharacterDetail: React.FC = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState<Character>(null);
  const [apiError, setApiError] = useState<string>('');
  const [apiState, setApiState] = useState<ApiState>('idle');

  const fetchCharacter = useCallback(async () => {
    try {
      setApiState('fetching');

      const character = await fetchCharacterById(Number(characterId));

      setCharacter(character);
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
    fetchCharacter();
  }, [fetchCharacter]);

  return (
    <div className={s.wrapper}>
      {apiState === 'fetching' && <Spinner />}
      {apiState === 'error' && <div className={s.error}>{apiError}</div>}
      {apiState === 'success' && [
        <img className={s.characterImage} src={character?.image} />,
        INFO_KEYS.map(key => {
          const keyText = key.charAt(0).toUpperCase() + key.slice(1) + ':';
          const valueText = character[key].toString();

          return (
            <div key={key} className={s.infoRow}>
              <span className={s.infoKey}>{keyText}</span>
              <span className={s.infoValue}>{valueText}</span>
            </div>
          );
        }),
      ]}
    </div>
  );
};
