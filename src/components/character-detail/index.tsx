import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../';
import { INFO_KEYS } from './constants';
import { getFetchCharacterHandler } from './utils';
import { capitalizeFirstLetter } from '../../assets/utils/helpers';
import { ApiState } from '../../models/api';
import { Character } from '../../models/character';
import s from './index.module.css';

export const CharacterDetail: React.FC = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState<Character>(null);
  const [apiError, setApiError] = useState<string>('');
  const [apiState, setApiState] = useState<ApiState>('idle');

  const fetchCharacter = useCallback(
    getFetchCharacterHandler(setApiState, setCharacter, setApiError),
    [characterId]
  );

  useEffect(() => {
    fetchCharacter(Number(characterId));
  }, [characterId]);

  return (
    <div className={s.wrapper}>
      {apiState === 'fetching' && <Spinner />}
      {apiState === 'error' && <div className={s.error}>{apiError}</div>}
      {apiState === 'success' && (
        <>
          <img className={s.characterImage} src={character?.image} />
          {INFO_KEYS.map(key => {
            const keyText = capitalizeFirstLetter(key) + ':';
            const valueText = character[key].toString();

            return (
              <div key={key} className={s.infoRow}>
                <span className={s.infoKey}>{keyText}</span>
                <span className={s.infoValue}>{valueText}</span>
              </div>
            );
          })}
          <Link className={s.link} to="/">
            Go back
          </Link>
        </>
      )}
    </div>
  );
};
