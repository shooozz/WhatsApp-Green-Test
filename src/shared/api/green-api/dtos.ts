export class GetChatHistoryDto {
  phoneNumber!: string;
}
export class ChatHistoryResDto {
  type!: string;
  chatId!: string;
  textMessage!: string;
  senderName!: string;
}

export class PostMessageDto {
  phoneNumber!: string;
  message!: string;
}
export class MessageResDto {
  idMessage!: string;
}

export class GetNotificationResDto {
  'typeWebhook': string;
  'instanceData': {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  'timestamp': number;
  'idMessage': string;
  'senderData': {
    chatId: string;
    sender: string;
    chatName: string;
    senderName: string;
    senderContactName: string;
  };
  'messageData': {
    typeMessage: string;
    textMessageData: {
      textMessage: string;
    };
  };
}
