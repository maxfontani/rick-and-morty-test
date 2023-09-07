import s from './index.module.css';
import { BodyProps } from './types';

const Body = ({ children }: BodyProps) => (
  <main className={s.body}>{children}</main>
);

export default Body;
