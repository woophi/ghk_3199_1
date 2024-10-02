import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Typography } from '@alfalab/core-components/typography';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <CDNIcon name="glyph_navigation-briefcase_m" className={thxSt.briefcase} />
        <Typography.Text tag="p" view="primary-medium">
          Проверяем статус вашей заявки на открытие брокерского счета
        </Typography.Text>
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          onClick={() => window.location.replace('alfabank://investments/open_brokerage_account')}
        >
          Перейти к счёту
        </ButtonMobile>
      </div>
    </>
  );
};
