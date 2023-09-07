import { Props } from './types';
import { Link } from 'react-router-dom';
import s from './index.module.css';

const ERROR_MESSAGE = 'Something went wrong, Ricky feels bad..';

export const ErrorScreen: React.FC<Props> = ({ message, route = '/' }) => {
  const text = message ?? ERROR_MESSAGE;

  return (
    <div className={s.outer}>
      <div className={s.inner}>
        <p>{text}</p>
        <Link to={route}>Go Back Home</Link>
      </div>
    </div>
  );
};
