import React from 'react';
import { Card, CardContent } from '@mui/material';
import { ChatHistoryResDto } from '@/shared/api/green-api';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

//TODO: Я бы без виртуализации списка сообщений в прод не пустил бы, надо сделать.
//Questions: Будет ли правильным использовать библиотеку 'react-window' или подразумивалось иное выполнение lazyLoading ?

type Props = {
  chatHistory: ChatHistoryResDto[];
};

export const ChatHistory = ({ chatHistory }: Props) => {
  const Row = ({ index, style }: ListChildComponentProps) => {
    const msg = chatHistory[index];

    return (
      <div
        style={style}
        className={`${msg.type === 'outgoing' ? 'text-right' : 'text-left'} mb-2`}
      >
        <strong>{msg.senderName ? msg.senderName : 'You'}:</strong>{' '}
        {msg.textMessage}
      </div>
    );
  };

  return (
    <Card className='mb-4'>
      <CardContent className='h-64 overflow-y-auto border p-2'>
        <List
          height={250}
          itemCount={chatHistory.length}
          itemSize={50} // Высота одного элемента ( NOTE: Настроить автоподбор )
          width={'100%'}
        >
          {Row}
        </List>
      </CardContent>
    </Card>
  );
};
