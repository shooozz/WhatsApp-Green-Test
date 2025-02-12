import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/styles/App.css';
import '@/app/styles/index.css';
import { MainPage } from '@/pages/main';

function App() {
  return (
    <div className='app-container'>
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
      <MainPage />
    </div>
  );
}

export default App;
