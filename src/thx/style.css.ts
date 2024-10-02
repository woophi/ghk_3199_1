import { globalStyle, style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1rem',
  textAlign: 'center',
});

const briefcase = style({
  margin: '9rem 0 2rem',
  backgroundColor: '#F8F8F8',
  width: '128px',
  height: '128px',
  borderRadius: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`${briefcase} > svg`, {
  width: '64px',
  height: '64px',
});

export const thxSt = {
  container,

  briefcase,
};
