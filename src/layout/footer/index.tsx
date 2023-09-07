import { memo } from 'react';
import s from './index.module.css';

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.footerContent}>
      <div>
        All rights reserved ©
        <a
          href="https://www.darly.solutions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Darly Solutions
        </a>
      </div>
      <div>
        <a
          href="https://maxfontani.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Max Fontani
        </a>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
