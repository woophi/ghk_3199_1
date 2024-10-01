import { globalStyle, style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});
const containerBS = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});
const sberRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
const sberText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',
});

const inputBox = style({
  backgroundColor: '#2637580F',
  borderRadius: '10px',
  padding: '0 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const inputContainer = style({
  borderRadius: '12px',
  padding: '4px 4px 4px 16px',
  backgroundColor: '#2637580F',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
});
const inputValue = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const inputActions = style({
  backgroundColor: '#1E2B4414',
  borderRadius: '8px',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: '#04041578',
});
const inputActionsHR = style({
  height: '16px',
  width: '1px',
  backgroundColor: '#04041578',
});
const inputActionsMinus = style({});

globalStyle(`${inputActionsMinus} > svg > rect:last-child`, {
  fill: '#04041578',
});

const codeBoxContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const codeBox = style({
  width: '36px',
  height: '48px',
  backgroundColor: 'rgba(38, 55, 88, 0.06)',
  fontSize: '30px',
  fontWeight: 700,
  textAlign: 'center',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const appSt = {
  bottomBtn,
  container,
  sberRow,
  sberText,
  row,
  containerBS,
  inputBox,
  inputContainer,
  inputValue,
  inputActions,
  inputActionsHR,
  inputActionsMinus,
  codeBox,
  codeBoxContainer,
};
