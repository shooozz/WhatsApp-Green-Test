export class GetChatHistoryDto {
  idInstance!: string;
  apiTokenInstance!: string;
  phoneNumber!: string;
}
export class ChatHistoryResDto {
  type!: string;
  chatId!: string;
  textMessage!: string;
  senderName!: string;
}

export class PostMessageDto {
  idInstance!: string;
  apiTokenInstance!: string;
  phoneNumber!: string;
  message!: string;
}
export class MessageResDto {
  idMessage!: string;
}
