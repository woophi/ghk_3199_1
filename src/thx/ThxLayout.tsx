import { Typography } from '@alfalab/core-components/typography';
import rocket from '../assets/rocket.png';
import { thxSt } from './style.css';
import { useTimeout } from './useTimeout';

export const ThxLayout = () => {
  useTimeout(() => window.location.replace('alfabank://investments/open_brokerage_account'), 5000);

  return (
    <>
      <div className={thxSt.container}>
        <img src={rocket} width={135} className={thxSt.rocket} />
        <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
          Сервис пока недоступен
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Вся команда очень старается, скоро всё заработает!
        </Typography.Text>
      </div>
    </>
  );
};
