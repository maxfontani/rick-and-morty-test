import { InputLine } from '../input-line';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { SEARCH_PLACEHOLDER } from './constants';
import { Props } from './types';
import s from './index.module.css';

export const NavBar: React.FC<Props> = ({
  paginationInfo,
  getChangePageHandler,
  onChangeSearch,
}) => {
  const isPrevArrowShown = !!paginationInfo?.prev;
  const isNextArrowShown = !!paginationInfo?.next;

  return (
    <div className={s.wrapper}>
      {isPrevArrowShown && (
        <img
          className={s.arrowIcon}
          alt="Prev Page"
          title="Go to previous page"
          src={ArrowLeftIcon}
          onClick={getChangePageHandler('prev')}
        />
      )}
      <InputLine placeholder={SEARCH_PLACEHOLDER} onChange={onChangeSearch} />
      {isNextArrowShown && (
        <img
          className={s.arrowIcon}
          alt="Next Page"
          title="Go to next page"
          data-testid="next-page"
          src={ArrowRightIcon}
          onClick={getChangePageHandler('next')}
        />
      )}
    </div>
  );
};
