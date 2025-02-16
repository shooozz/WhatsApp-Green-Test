import React from 'react';
import { ChatHistoryResDto, GreenApiService } from '@/shared/api/green-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { ChatHistory } from '@/shared/ui/ChatHistory';
import {
  IMessageFormInputs,
  IMessageInput,
  messageValidationSchema
} from '@/pages/chat/models';
import { useGreenApiCtx } from '@/app/providers/with-green-api-context';
import { usePhoneNumberCtx } from '@/app/providers/with-phone-number-context';
import { useNavigate } from 'react-router-dom';

export const useChat = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = React.useState<ChatHistoryResDto[]>([]);
  const { greenApiClient } = useGreenApiCtx();
  const { phoneNumber } = usePhoneNumberCtx();

  React.useEffect(() => {
    if (!greenApiClient) {
      toast.error('GreenApiClient is not defined');
      navigate('/');
      return;
    }
    if (!phoneNumber) {
      toast.error('Phone Number is not defined');
      navigate('/');
      return;
    }
  }, []);

  const onSubmit: SubmitHandler<IMessageFormInputs> = async (data) => {
    if (!greenApiClient) {
      toast.error('GreenApiClient is not defined');
      navigate('/');
      return;
    }
    if (!phoneNumber) {
      toast.error('Phone Number is not defined');
      navigate('/');
      return;
    }

    const postMessageRes = await GreenApiService.postMessage(greenApiClient, {
      phoneNumber,
      message: data.message
    });

    if (postMessageRes?.status === 200) {
      toast.success('Message sent');
    }

    const chatHistoryRes = await GreenApiService.getChatHistory(
      greenApiClient,
      {
        phoneNumber
      }
    );

    if (chatHistoryRes?.status === 200) {
      setChatHistory(chatHistoryRes.data);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IMessageFormInputs>({
    defaultValues: {
      message: ''
    },
    resolver: yupResolver(messageValidationSchema)
  });

  const inputs: Array<IMessageInput> = [{ label: 'Message', name: 'message' }];

  return {
    ChatHistory: <ChatHistory chatHistory={chatHistory} />,
    onSubmit: handleSubmit(onSubmit),
    inputs,
    register,
    errors
  };
};
