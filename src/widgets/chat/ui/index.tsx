import React from 'react';
import { Button, Card, CardContent, Input } from '@mui/material';
import { useGetChatHistory, usePostMessage } from '@/entities/message/hooks';
import { ChatHistory } from '@/shared/ui/ChatHistory';
import { GreenApiChatHistoryResDto } from '@/shared/api/green-api/green-api-client';

export const ChatWidget = () => {
  //TODO: Тут лучше использовать Formik или react-hook-form, так формы не делаются, как ты сделал. Тогда и ненужный локальный стейт уйдет.

  const [idInstance, setIdInstance] = React.useState('');
  const [apiTokenInstance, setApiTokenInstance] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<GreenApiChatHistoryResDto[]>([]);
  const [message, setMessage] = React.useState('');

  const MemoizedChatHistory = React.useMemo(
    () => <ChatHistory chatHistory={chatHistory} />,
    [chatHistory]
  );

  const { sendMessage } = usePostMessage(
    idInstance,
    apiTokenInstance,
    phoneNumber,
    message,
    setMessage,
    setChatHistory
  );
  const { fetchMessages } = useGetChatHistory(
    idInstance,
    apiTokenInstance,
    phoneNumber,
    setChatHistory
  );

  return (
    <div className='p-4'>
      <Card className='mb-4'>
        <CardContent>
          <div className='grid gap-4'>
            <Input
              placeholder='idInstance'
              value={idInstance}
              onChange={e => setIdInstance(e.target.value)}
            />
            <Input
              placeholder='apiTokenInstance'
              value={apiTokenInstance}
              onChange={e => setApiTokenInstance(e.target.value)}
            />
            <Input
              placeholder='Recipient Phone Number'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className='flex gap-2'>
        <Input
          className='flex-grow'
          placeholder='Type your message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
        <Button variant='outlined' onClick={fetchMessages}>
          Refresh
        </Button>
      </div>

      {MemoizedChatHistory}
    </div>
  );
};
