import React from 'react';
import { ChatHistoryResDto, GreenApiService } from '@/shared/api/green-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInputs, IInput, validationSchema } from '@/widgets/chat/models';
import { GreenApiClient } from '@/shared/api/green-api/green-api-client';
import { toast } from 'react-toastify';
import { ChatHistory } from '@/shared/ui/ChatHistory';
import { handleError } from '@/shared/lib/error-handler';

export const useChat = () => {
  const [chatHistory, setChatHistory] = React.useState<ChatHistoryResDto[]>([
    {
      type: 'outgoing',
      idMessage: 'BAE597C0E7723C5E',
      timestamp: 1739646614,
      typeMessage: 'extendedTextMessage',
      chatId: '79659645069@c.us',
      textMessage: 'Hello again',
      extendedTextMessage: {
        text: 'Hello again',
        description: '',
        title: '',
        previewType: 'None',
        jpegThumbnail: '',
        forwardingScore: 0,
        isForwarded: false
      },
      statusMessage: 'delivered',
      sendByApi: true,
      deletedMessageId: '',
      editedMessageId: '',
      isEdited: false,
      isDeleted: false
    },
    {
      type: 'incoming',
      idMessage: '3EB0C26FD82FEF08B78D3C',
      timestamp: 1739644368,
      typeMessage: 'textMessage',
      chatId: '79659645069@c.us',
      textMessage: 'THanks',
      senderId: '79659645069@c.us',
      senderName: '.',
      senderContactName: '',
      deletedMessageId: '',
      editedMessageId: '',
      isEdited: false,
      isDeleted: false
    }
  ]);

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
    // Questions: Было ли правильно вынести обработку ошибок в lib? Нужно ли создавать отдельный handle-success.ts ? (Я не нашел иного успешного ответа в документации, кроме 200. GPT ссылался ещё на "201 Created: Ресурс успешно создан.", но я такого на сайте не нашел, может потому что это не касается наших запросов)

    if (postMessageRes?.status === 200) {
      toast.success('Message sent');
    } else {
      handleError(postMessageRes);
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
