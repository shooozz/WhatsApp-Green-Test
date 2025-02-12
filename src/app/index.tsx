import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/styles/App.css';
import '@/app/styles/index.css';
import { MainPage } from '@/pages/main';
import { withProviders } from '@/app/providers';

function App() {
  return (
    <div className='app-container'>
      <MainPage />
    </div>
  );
}

export default withProviders(App);
