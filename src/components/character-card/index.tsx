import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Props } from './types';
import s from './index.module.css';

export const CharacterCard: React.FC<Props> = memo(({ character }) => (
  <NavLink
    className={s.card}
    to={`/character/${character.id}`}
    data-testid="character-card"
  >
    <div className={s.cardTitle} title={character.name}>
      {character.name}
    </div>
    <div className={s.cardImgOuter}>
      <img className={s.cardImg} src={character.image} alt="" />
    </div>
  </NavLink>
));
