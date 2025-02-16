import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/styles/App.css';
import '@/app/styles/index.css';
import 'reflect-metadata';
import { withProviders } from '@/app/providers';
import { Routing } from '@/pages';

function App() {
  return (
    <div className='app-container'>
      <Routing />
    </div>
  );
}

export default withProviders(App);
