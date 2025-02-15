import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

// =========== CHAT HISTORY DTO ===========
export class GetChatHistoryDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

// =========== EXTENDEDTEXTMESSAGE (if it has) DTO ===========
export class ExtendedTextMessageDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  previewType?: string;

  @IsString()
  @IsOptional()
  jpegThumbnail?: string;

  @IsNumber()
  @IsOptional()
  forwardingScore?: number;

  @IsBoolean()
  @IsOptional()
  isForwarded?: boolean;
}

// =========== GET NOTIFICATION RES DTO ===========
export class ChatHistoryResDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  idMessage: string;

  @IsNumber()
  @IsNotEmpty()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  typeMessage: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  textMessage: string;

  // Данные отправителя, если сообщение входящее
  @IsString()
  @IsOptional()
  senderId?: string;

  @IsString()
  @IsOptional()
  senderName?: string;

  @IsString()
  @IsOptional()
  senderContactName?: string;

  // Дополнительные данные, если сообщение расширенное (extendedTextMessage)
  @ValidateNested()
  @Type(() => ExtendedTextMessageDto)
  @IsOptional()
  extendedTextMessage?: ExtendedTextMessageDto;

  @IsString()
  @IsOptional()
  statusMessage?: string;

  @IsBoolean()
  @IsOptional()
  sendByApi?: boolean;

  @IsString()
  @IsOptional()
  deletedMessageId?: string;

  @IsString()
  @IsOptional()
  editedMessageId?: string;

  @IsBoolean()
  @IsOptional()
  isEdited?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
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
