import React from 'react';
import { ChatHistoryResDto, GreenApiService } from '@/shared/api/green-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInputs, IInput, validationSchema } from '@/widgets/chat/models';
import { GreenApiClient } from '@/shared/api/green-api/green-api-client';
import { toast } from 'react-toastify';
import { ChatHistory } from '@/shared/ui/ChatHistory';

export const useChat = () => {
  const [chatHistory, setChatHistory] = React.useState<ChatHistoryResDto[]>([]);

  const inputs: Array<IInput> = [
    { label: 'Id', name: 'idInstance' },
    { label: 'API Token', name: 'apiTokenInstance' },
    { label: 'Phone number', name: 'phoneNumber' },
    { label: 'Message', name: 'message' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
      phoneNumber: '',
      message: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const greenApiClient = new GreenApiClient(
      data.idInstance,
      data.apiTokenInstance
    );

    const postMessageRes = await GreenApiService.postMessage(greenApiClient, {
      phoneNumber: data.phoneNumber,
      message: data.message
    });

    // TODO: Сверься с документацией, какие успешные коды вообще могут прийти, нужно учесть все коды и все коды ошибок, но коды ошибок в сервисе GreenApiService, я там организовал работу с ошибками. Если хочешь -- вынеси из сервиса обработку ошибок, возможно так будет правильнее и сервис будет чище.

    if (postMessageRes?.status === 200) {
      toast.success('Message sent');
    } else {
      toast.error('Error when sending message');
    }

    const chatHistoryRes = await GreenApiService.getChatHistory(
      greenApiClient,
      {
        phoneNumber: data.phoneNumber
      }
    );

    if (chatHistoryRes?.status === 200) {
      setChatHistory(chatHistoryRes.data);
    } else {
      toast.error('Error when receiving chat history');
    }
  };

  return {
    ChatHistory: <ChatHistory chatHistory={chatHistory} />,
    onSubmit: handleSubmit(onSubmit),
    inputs,
    register,
    errors
  };
};
