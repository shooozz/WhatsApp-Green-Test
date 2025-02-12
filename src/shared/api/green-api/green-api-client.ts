import axios from 'axios';
import {
  ChatHistoryResDto,
  GetChatHistoryDto,
  MessageResDto,
  PostMessageDto
} from '@/shared/api/green-api/dtos';

//TODO: Green API URL надо в .env вынести.

export class GreenApiClient {
  public postMessage = async ({
    idInstance,
    apiTokenInstance,
    phoneNumber,
    message
  }: PostMessageDto) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    return axios.post<MessageResDto>(apiUrl, {
      chatId: `${phoneNumber}@c.us`,
      message
    });
  };

  public getChatHistory = async ({
    idInstance,
    apiTokenInstance,
    phoneNumber
  }: GetChatHistoryDto) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;
    return axios.post<ChatHistoryResDto>(apiUrl, {
      chatId: `${phoneNumber}@c.us`
    });
  };
}
