import { GreenApiService } from '@/shared/api/green-api';
import { GreenApiClient } from '@/shared/api/green-api/green-api-client';
import { toast } from 'react-toastify';

//TODO: Тут нужна типизация аргументов функции хука

export const useGetChatHistory = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  setChatHistory: Function
) => {
  const fetchMessages = async () => {
    const greenApiClient = new GreenApiClient();

    const chatHistoryRes = await GreenApiService.getChatHistory(
      greenApiClient,
      {
        idInstance,
        apiTokenInstance,
        phoneNumber
      }
    );

    if (chatHistoryRes) {
      setChatHistory(chatHistoryRes.data);
    } else {
      toast.error('Не получилось получить историю сообщений');
    }
  };

  return { fetchMessages };
};

export const usePostMessage = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  message: string,
  setMessage: Function,
  setChatHistory: Function
) => {
  const sendMessage = async () => {
    setMessage('');

    const greenApiClient = new GreenApiClient();
    await GreenApiService.postMessage(greenApiClient, {
      idInstance,
      apiTokenInstance,
      phoneNumber,
      message
    });

    useGetChatHistory(
      idInstance,
      apiTokenInstance,
      phoneNumber,
      setChatHistory
    );
  };

  return { sendMessage };
};
