import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

// =========== CHAT HISTORY DTO ===========
export class GetChatHistoryDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class ChatHistoryResDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  textMessage: string;

  @IsString()
  @IsNotEmpty()
  senderName: string;
}

// =========== POST MESSAGE DTO ===========
export class PostMessageDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class MessageResDto {
  @IsString()
  @IsNotEmpty()
  idMessage: string;
}

// =========== GET NOTIFICATION RES DTO ===========
export class GetNotificationResDto {
  @IsString()
  @IsNotEmpty()
  typeWebhook: string;

  @ValidateNested()
  @Type(() => InstanceData)
  instanceData: InstanceData;

  @IsNumber()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  idMessage: string;

  @ValidateNested()
  @Type(() => SenderData)
  senderData: SenderData;

  @ValidateNested()
  @Type(() => MessageData)
  messageData: MessageData;
}

class InstanceData {
  @IsNumber()
  idInstance: number;

  @IsString()
  @IsNotEmpty()
  wid: string;

  @IsString()
  @IsNotEmpty()
  typeInstance: string;
}

class SenderData {
  @IsString()
  @IsOptional()
  chatId: string;

  @IsString()
  @IsOptional()
  sender: string;

  @IsString()
  @IsOptional()
  chatName: string;

  @IsString()
  @IsOptional()
  senderName: string;

  @IsString()
  @IsOptional()
  senderContactName: string;
}

class MessageData {
  @IsString()
  @IsNotEmpty()
  typeMessage: string;

  @ValidateNested()
  @Type(() => TextMessageData)
  textMessageData: TextMessageData;
}

class TextMessageData {
  @IsString()
  @IsNotEmpty()
  textMessage: string;
}