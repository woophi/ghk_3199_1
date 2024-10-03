import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Typography } from '@alfalab/core-components/typography';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

export const ThxLayout = ({ withFirstError }: { withFirstError: boolean }) => {
  return (
    <>
      <div className={thxSt.container}>
        <CDNIcon
          name={withFirstError ? 'glyph_screwdriver-paint-brush_m' : 'glyph_navigation-briefcase_m'}
          className={thxSt.briefcase}
        />

        {withFirstError ? (
          <>
            <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
              Не получилось подать поручение на покупку актива
            </Typography.TitleResponsive>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false} color="secondary">
              Уже знаем, в чём дело, и чиним. Попробуйте зайти позже или открыть брокерский счет самостоятельною
            </Typography.Text>
          </>
        ) : (
          <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
            Проверяем статус вашей заявки на открытие брокерского счета
          </Typography.TitleResponsive>
        )}
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '3199_to_account_v1');
            window.location.replace('alfabank://investments/open_brokerage_account');
          }}
        >
          {withFirstError ? 'Открыть брокерский счет' : 'Перейти к счёту'}
        </ButtonMobile>
      </div>
    </>
  );
};
