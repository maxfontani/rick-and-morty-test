import s from './index.module.css';

export const Spinner: React.FC = () => (
  <div className={s.things} data-testid="spinner">
    <div className={s.thing}>
      <div className={s.thing}>
        <div className={s.thing}>
          <div className={s.thing}>
            <div className={s.thing}>
              <div className={s.thing}>
                <div className={s.thing}>
                  <div className={s.thing}>
                    <div className={s.thing}>
                      <div className={s.thing}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
