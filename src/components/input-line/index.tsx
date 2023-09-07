import { Props } from './types';
import s from './index.module.css';

export const InputLine: React.FC<Props> = props => (
  <div className={s.wrapper}>
    <input
      id="underline"
      className={s.input}
      type="text"
      disabled={props.disabled}
      placeholder={props.placeholder}
      // @ts-expect-error
      invalid={props?.invalid ? 'true' : 'false'}
      onChange={props.onChange}
    />
    <span className={s.underline} data-testid="underline"></span>
  </div>
);
