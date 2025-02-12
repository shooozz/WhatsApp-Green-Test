import React from 'react';
import { ToastContainer } from 'react-toastify';

export const withToast = (component: () => React.ReactNode) => () => (
  <>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {component()}
  </>
);
