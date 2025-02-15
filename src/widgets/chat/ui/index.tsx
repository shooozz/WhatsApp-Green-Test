import React from 'react';
import { useChat } from '@/widgets/chat/hooks';
import { toast } from 'react-toastify';

export const ChatWidget = () => {
  const { inputs, ChatHistory, onSubmit, register, errors } = useChat();

  return (
    <>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name}>{input.label}</label>
            <input id={input.name} {...register(input.name)} />
            <p role='alert'>{errors[input.name]?.message}</p>
          </div>
        ))}
        <input type='submit' />
      </form>
      <button onClick={() => toast.done('HELLO')}>TOAST TEST</button>

      {ChatHistory}
    </>
  );
};
