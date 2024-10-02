declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string) => void;
  }
}

type Payload = {
  bid: string;
  price: number;
  count: number;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbw9P5iy3hGcU5dLGp6TEK4-OqxT7B5eFQX9-pVZ54f9nXvUGuMW6d0OFQV9YK-Z6QPoYw/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, variant: 'variant1' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
