import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { Notification } from '@alfalab/core-components/notification';
import { SelectMobile } from '@alfalab/core-components/select/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import HB from './assets/hb.png';
import rubIcon from './assets/rubIcon.png';
import sberIcon from './assets/sber.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const OPTIONS = [
  { key: 'Лимитная заявка', content: 'Лимитная заявка' },
  { key: 'Рыночная заявка', content: 'Рыночная заявка' },
];

const generate4RandomDigits = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openBS, setOpenBS] = useState(false);
  const [otpCode, setCode] = useState('');
  const [price, setPrice] = useState(268.7);
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(1);
  const [reqType, setReqTpe] = useState('Лимитная заявка');
  const splittedOtp = otpCode.split('');

  const submit = useCallback(() => {
    window.gtag('event', '3199_confirm_v1');
    setLoading(true);

    sendDataToGA({
      bid: reqType,
      count,
      price,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      window.location.replace('alfabank://investments/open_brokerage_account');
    });
  }, [reqType, count, price]);

  const onUp = useCallback(() => {
    setPrice(v => Number((v >= 999 ? 999 : v + 0.01).toFixed(2)));
  }, []);
  const onDown = useCallback(() => {
    setPrice(v => Number((v <= 0 ? 0 : v - 0.01).toFixed(2)));
  }, []);
  const onUpCount = useCallback(() => {
    setCount(v => (v >= 999 ? 999 : v + 1));
  }, []);
  const onDownCount = useCallback(() => {
    setCount(v => (v <= 0 ? 0 : v - 1));
  }, []);

  const goToBuy = useCallback(() => {
    window.gtag('event', '3199_buy_stocks_v1');
    setStep(2);

    setTimeout(() => {
      setShowNotification(true);
    }, 2500);
    setTimeout(() => {
      setCode(generate4RandomDigits());
    }, 3000);
  }, []);

  const bsContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={appSt.containerBS}>
            <div className={appSt.sberRow}>
              <img src={sberIcon} width={48} height={48} />

              <div className={appSt.sberText}>
                <Typography.Text view="component">Сбербанк</Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  SBER
                </Typography.Text>
              </div>
            </div>
            <Typography.TitleResponsive tag="h3" view="xsmall" font="system" weight="semibold">
              Счет списания
            </Typography.TitleResponsive>

            <div className={appSt.inputBox}>
              <img src={rubIcon} width={48} height={48} />
              <Typography.TitleResponsive tag="h3" view="xsmall" font="system" weight="medium">
                Текущий счет
              </Typography.TitleResponsive>
            </div>

            <div>
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                Покупка акций и комиссия
              </Typography.Text>
              <Typography.Text tag="p" view="secondary-small" defaultMargins={false}>
                Коммисия будет рассчитана по факту сделки на бирже
              </Typography.Text>
            </div>

            <SelectMobile
              options={OPTIONS}
              placeholder="Выберите тип заявки"
              size={48}
              block
              onChange={p => {
                setReqTpe(p.selected?.key ?? '');
              }}
              selected={reqType}
            />

            {reqType === 'Лимитная заявка' && (
              <>
                <Typography.TitleResponsive tag="h3" view="xsmall" font="system" weight="semibold">
                  Цена за акцию
                </Typography.TitleResponsive>
                <div>
                  <div className={appSt.inputContainer}>
                    <div className={appSt.inputValue}>
                      <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                        {price}
                      </Typography.Text>
                      <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                        ₽
                      </Typography.Text>
                    </div>

                    <div className={appSt.inputActions}>
                      <span onClick={onDown} style={{ display: 'inline-flex' }}>
                        <CDNIcon name="glyph_minus_m" className={appSt.inputActionsMinus} />
                      </span>
                      <div className={appSt.inputActionsHR} />

                      <span onClick={onUp} style={{ display: 'inline-flex' }}>
                        <CDNIcon name="glyph_plus_m" />
                      </span>
                    </div>
                  </div>
                  <Typography.Text view="component-secondary" color="secondary">
                    Шаг цены 0,01
                  </Typography.Text>
                </div>
              </>
            )}

            <Typography.TitleResponsive tag="h3" view="xsmall" font="system" weight="semibold">
              Количество лотов
            </Typography.TitleResponsive>

            <div>
              <Typography.Text view="component-secondary" color="secondary">
                1 лот = 10 акций
              </Typography.Text>
              <div className={appSt.inputContainer}>
                <div className={appSt.inputValue}>
                  <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                    {count}
                  </Typography.Text>
                </div>

                <div className={appSt.inputActions}>
                  <span onClick={onDownCount} style={{ display: 'inline-flex' }}>
                    <CDNIcon name="glyph_minus_m" className={appSt.inputActionsMinus} />
                  </span>
                  <div className={appSt.inputActionsHR} />

                  <span onClick={onUpCount} style={{ display: 'inline-flex' }}>
                    <CDNIcon name="glyph_plus_m" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: {
        return (
          <div className={appSt.containerBS}>
            <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
              Введите код из сообщения, чтобы открыть брокерский счёт и купить этот актив
            </Typography.TitleResponsive>
            <Typography.Text tag="p" view="primary-medium" color="secondary">
              Код отправлен на телефон указанный в анкете
            </Typography.Text>

            <div className={appSt.codeBoxContainer}>
              <div className={appSt.codeBox}>{splittedOtp[0] ?? ''}</div>
              <div className={appSt.codeBox}>{splittedOtp[1] ?? ''}</div>
              <div className={appSt.codeBox}>{splittedOtp[2] ?? ''}</div>
              <div className={appSt.codeBox}>{splittedOtp[3] ?? ''}</div>
            </div>

            <div />
            <div
              className={appSt.sberRow}
              onClick={() => {
                window.gtag('event', '3199_doc1_v1');
              }}
            >
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Заявление на обслуживание на финансовых рынках</Typography.Text>
            </div>
            <div
              className={appSt.sberRow}
              onClick={() => {
                window.gtag('event', '3199_doc2_v1');
              }}
            >
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Анкета депонента</Typography.Text>
            </div>
            <div
              className={appSt.sberRow}
              onClick={() => {
                window.gtag('event', '3199_doc3_v1');
              }}
            >
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Декларация о рисках</Typography.Text>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const bsButton = () => {
    switch (step) {
      case 1:
        return (
          <ButtonMobile block view="primary" onClick={goToBuy}>
            Купить
          </ButtonMobile>
        );
      case 2: {
        return (
          <div className={appSt.containerBS}>
            <Typography.Text view="component-secondary">
              C вашего текущего счета будет списана сумма для покупки выбранной бумаги и зачислено на брокерский счет
            </Typography.Text>
            <Typography.Text view="component-secondary">
              Нажимая «Подтвердить и купить», вы соглашаетесь отправить заявку на открытие брокерского счёта
            </Typography.Text>
            <ButtonMobile loading={loading} block view="primary" onClick={submit} disabled={!otpCode}>
              Потвердить и купить
            </ButtonMobile>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (LS.getItem(LSKeys.ShowThx, false)) {
    return <ThxLayout />;
  }

  return (
    <>
      <img src={HB} width="100%" />
      <div className={appSt.container}>
        <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="semibold">
          Сбербанк
        </Typography.TitleResponsive>

        <div className={appSt.sberRow}>
          <img src={sberIcon} width={48} height={48} />

          <div className={appSt.sberText}>
            <Typography.Text view="component">Сбербанк</Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              SBER
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <Typography.Text view="component">Купить не выше</Typography.Text>
          <Typography.Text view="primary-medium" weight="bold">
            300 ₽
          </Typography.Text>
        </div>
        <div className={appSt.row}>
          <Typography.Text view="component">Продать не ниже</Typography.Text>
          <Typography.Text view="primary-medium" weight="bold">
            365 ₽
          </Typography.Text>
        </div>
        <Typography.Text view="primary-medium" weight="medium">
          У инвесторов к Сбербанку безусловная любовь. Он давно держится на первом месте в народном портфеле Мосбиржи, а
          стоимость его акций готова к росту.
        </Typography.Text>
        <Typography.Text view="primary-medium">
          Наши аналитики ожидают подъема акций к 365 руб. или рост на 38% на горизонте 12 месяцев
        </Typography.Text>

        <Typography.TitleResponsive tag="h2" view="small" font="system" weight="semibold">
          Почему акции стоит рассмотреть к покупке
        </Typography.TitleResponsive>
        <Typography.Text view="primary-medium">
          Судя по мультипликаторам, банк эффективно ведет бизнес, но пока его котировки не отражают всех перспектив и,
          вероятно, еще прибавят в цене.
        </Typography.Text>
        <Typography.Text view="primary-medium">
          Российские компании теперь не могут кредитоваться за рубежом, и это на руку Сбербанку.
        </Typography.Text>
        <Typography.Text view="primary-medium">
          Половину чистой прибыли банк отдает инвесторам в качестве дивидендов – это им, безусловно, нравится.
        </Typography.Text>
        <Typography.Text view="primary-medium">
          Последние отчеты показывают, что Сбербанк сможет нарастить прибыль по итогам 2024 года. Это приведет к росту
          дивидендов в 2025 году.
        </Typography.Text>
        <Typography.Text view="primary-medium">Дата публикации идеи: 19.09.2024</Typography.Text>
        <Typography.Text view="primary-small" color="secondary">
          Данная информация не является индивидуальной инвестиционной рекомендацией.
        </Typography.Text>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '3199_buy_v1');
            setOpenBS(true);
          }}
        >
          Купить
        </ButtonMobile>
      </div>

      <BottomSheet
        stickyHeader
        title={
          <Typography.Text view="component" weight="medium">
            Покупка
          </Typography.Text>
        }
        open={openBS}
        onClose={() => {
          window.gtag('event', '3199_x_v1');
          setOpenBS(false);
        }}
        hasCloser
        titleAlign="center"
        actionButton={bsButton()}
        initialHeight="full"
      >
        {bsContent()}
      </BottomSheet>

      <Notification
        title="Код для подписания документов:"
        visible={showNotification}
        offset={20}
        onCloseTimeout={() => setShowNotification(false)}
        hasCloser={false}
      >
        {otpCode}
      </Notification>
    </>
  );
};
