import axios from 'axios';
import {
  ChatHistoryResDto,
  GetChatHistoryDto,
  GetNotificationResDto,
  MessageResDto,
  PostMessageDto
} from '@/shared/api/green-api/dtos';
import { envService } from '@/shared/lib/env';

//TODO: Green API URL надо в .env вынести. А так же подумать над наличием состояния у этого клиента, можно ли сделать stateless клиент и нужно ли.
// Можно передавать idInstance, apiTokenInstance вместе с phoneNumber, message как мне подсказал GPT. Но я хотел понять зачем это делается и не стал этого делать до полного осознования. Questions: Где можно прочитать или просмотреть про это?
const BASE_URL = envService.VITE_GREEN_API_URL;

export class GreenApiClient {
  constructor(
    public readonly idInstance: string,
    private readonly apiTokenInstance: string
  ) {}

  public postMessage = async ({ phoneNumber, message }: PostMessageDto) => {
    const url = new URL(
      `${BASE_URL}/waInstance${this.idInstance}/SendMessage/${this.apiTokenInstance}`
    );

    return axios.post<MessageResDto>(url.toString(), {
      chatId: `${phoneNumber}@c.us`,
      message
    });
  };

  public getChatHistory = async ({ phoneNumber }: GetChatHistoryDto) => {
    const url = new URL(
      `${BASE_URL}/waInstance${this.idInstance}/getChatHistory/${this.apiTokenInstance}`
    );

    return axios.post<Array<ChatHistoryResDto>>(url.toString(), {
      chatId: `${phoneNumber}@c.us`
    });
  };

  public receiveNotification = async (timeout: number | string = 5) => {
    const url = new URL(
      `${BASE_URL}/waInstance${this.idInstance}/receiveNotification/${this.apiTokenInstance}`
    );
    url.searchParams.append('receiveTimeout', timeout.toString());

    return axios.post<GetNotificationResDto>(url.toString());
  };

  public deleteNotification = async (receiptId: number | string) => {
    const url = new URL(
      `${BASE_URL}/waInstance${this.idInstance}/deleteNotification/${this.apiTokenInstance}`
    );
    url.searchParams.append('receiptId', receiptId.toString());

    return axios.post<{ result: boolean }>(url.toString());
  };
}
