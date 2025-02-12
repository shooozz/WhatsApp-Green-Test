import axios from 'axios';

// TODO: Валидация входящих/исходящих данных (можно через class-validator & class-transformer), плюс rate-limiter. По-сути ты тут api-клиент сделать должен, точнее,ты уже сделал, и так же нужен сервис для работы с этим апи-клиентом в котором и будет происходить валидация и ограничение количества запросов.

export class GreenApiChatHistoryResDto {
  type!: string;
  chatId!: string;
  textMessage!: string;
  senderName!: string;
}

export class GreenApiMessageDto {
  idInstance!: string;
  apiTokenInstance!: string;
  phoneNumber!: string;
  message!: string;
}

export class GreenApiCredsDto {
  idInstance!: string;
  apiTokenInstance!: string;
  phoneNumber!: string;
}

export class GreenApiClient {
  public postMessage = async ({
    idInstance,
    apiTokenInstance,
    phoneNumber,
    message
  }: GreenApiMessageDto) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    return axios.post<{ idMessage: string }>(apiUrl, {
      chatId: `${phoneNumber}@c.us`,
      message
    });
  };

  public getChatHistory = async ({
    idInstance,
    apiTokenInstance,
    phoneNumber
  }: GreenApiCredsDto) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;
    return axios.post<GreenApiChatHistoryResDto>(apiUrl, {
      chatId: `${phoneNumber}@c.us`
    });
  };
}
