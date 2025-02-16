import React from 'react';
import { Form } from '@/shared/ui/Form';
import { useChat } from '@/pages/chat/hooks';

export const ChatPage = () => {
  const { inputs, register, errors, onSubmit, ChatHistory } = useChat();

  return (
    <>
      <Form
        inputs={inputs}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
      />

      {ChatHistory}
    </>
  );
};
