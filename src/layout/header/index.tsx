import { memo } from 'react';
import s from './index.module.css';

function Header() {
  return (
    <header className={s.wrapper}>
      <div className={s.title}>Rick & Morty</div>
      <div className={s.subTitle}>Discover your favorite characters!</div>
    </header>
  );
}

export default memo(Header);
