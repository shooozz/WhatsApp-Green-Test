import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const withToast = (Component: React.ComponentType): React.FC => {
  return (props) => (
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
        theme='dark'
        transition={Bounce}
      />
      <Component {...props} />
    </>
  );
};
