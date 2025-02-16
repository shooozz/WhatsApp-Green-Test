import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui';
import { PhoneNumberPage } from '@/pages/phone-number/ui';
import { ChatPage } from '@/pages/chat/ui';

export const Routing = () => (
  <Routes>
    <Route index element={<LoginPage />} />
    <Route path='/phone-number' element={<PhoneNumberPage />} />
    <Route path='/chat' element={<ChatPage />} />
  </Routes>
);
