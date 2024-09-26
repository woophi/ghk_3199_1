import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { SelectMobile } from '@alfalab/core-components/select/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { DocumentCallback } from 'react-pdf/src/shared/types.js';
import HB from './assets/hb.png';
import pdf1 from './assets/pdf1.pdf';
import pdf2 from './assets/pdf2.pdf';
import pdf3 from './assets/pdf3.pdf';
import rubIcon from './assets/rubIcon.png';
import sberIcon from './assets/sber.png';
import smileIcon from './assets/smile.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const OPTIONS = [
  { key: 'Лимитная заявка', content: 'Лимитная заявка' },
  { key: 'Рыночная заявка', content: 'Рыночная заявка' },
];

async function createFileFromPDF(pdfPath: string) {
  // Fetch the PDF as a blob
  const response = await fetch(pdfPath);
  const blob = await response.blob();

  // Create a File object from the blob
  const file = new File([blob], 'sample.pdf', { type: 'application/pdf' });

  return file;
}

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [openBS, setOpenBS] = useState(false);
  const [price, setPrice] = useState(268.7);
  const [count, setCount] = useState(100);
  const [step, setStep] = useState(1);
  const [reqType, setReqTpe] = useState('Лимитная заявка');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selectedPdf, setSelectedPdf] = useState<File | null>();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: DocumentCallback) => {
    setNumPages(numPages);
  };

  const submit = useCallback(() => {
    setLoading(true);

    LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
    setLoading(false);
    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    // });
  }, []);

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

  if (thxShow) {
    return <ThxLayout />;
  }

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
            <img src={smileIcon} width={48} height={48} />
            <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
              Откройте брокерский счёт, чтобы купить этот актив
            </Typography.TitleResponsive>

            <div className={appSt.sberRow} onClick={async () => setSelectedPdf(await createFileFromPDF(pdf1))}>
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Заявление на обслуживание на финансовых рынках</Typography.Text>
            </div>
            <div className={appSt.sberRow} onClick={async () => setSelectedPdf(await createFileFromPDF(pdf2))}>
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Анкета депонента</Typography.Text>
            </div>
            <div className={appSt.sberRow} onClick={async () => setSelectedPdf(await createFileFromPDF(pdf3))}>
              <CDNIcon name="glyph_documents-lines_m" color="#04041578" />
              <Typography.Text view="component">Декларация о рисках</Typography.Text>
            </div>
            {selectedPdf && (
              <Document options={options} file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (_el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            )}
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
          <ButtonMobile block view="primary" onClick={() => setStep(2)}>
            Купить
          </ButtonMobile>
        );
      case 2: {
        return (
          <div className={appSt.containerBS}>
            <Typography.Text view="component-secondary" color="secondary">
              Нажимая «Подписать документы», вы подписываете документы для открытия брокерского счёта
            </Typography.Text>
            <ButtonMobile block view="primary" onClick={() => setStep(3)}>
              Подписать документы
            </ButtonMobile>
          </div>
        );
      }

      default:
        return null;
    }
  };

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
        <ButtonMobile block view="primary" onClick={() => setOpenBS(true)}>
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
        onClose={() => setOpenBS(false)}
        hasCloser
        titleAlign="center"
        actionButton={bsButton()}
        initialHeight="full"
      >
        {bsContent()}
      </BottomSheet>
    </>
  );
};
