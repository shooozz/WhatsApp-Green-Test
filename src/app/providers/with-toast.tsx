import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const withToast = (component: () => React.ReactNode) => () => (
  <>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Bounce}
    />
    {component()}
  </>
);
