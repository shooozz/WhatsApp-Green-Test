import React from 'react';
import { Card, CardContent } from '@mui/material';
import { ChatHistoryResDto } from '@/shared/api/green-api';

//TODO: Я бы без виртуализации списка сообщений в прод не пустил бы, надо сделать.

type Props = {
  chatHistory: ChatHistoryResDto[];
};

export const ChatHistory = ({ chatHistory }: Props) => {
  return (
    <Card className='mb-4'>
      <CardContent className='h-64 overflow-y-auto border p-2'>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`${msg.type === 'outgoing' ? 'text-right' : 'text-left'} mb-2`}
          >
            <strong>{msg.senderName ? msg.senderName : 'You'}:</strong>{' '}
            {msg.textMessage}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
