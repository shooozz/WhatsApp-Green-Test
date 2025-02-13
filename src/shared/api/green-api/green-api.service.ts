import {
  GreenApiClient,
} from '@/shared/api/green-api/green-api-client';
import { plainToInstance } from 'class-transformer';
import { toast } from 'react-toastify';
import { validate } from 'class-validator';
import Bottleneck from 'bottleneck';
import { GetChatHistoryDto, PostMessageDto } from '@/shared/api/green-api/dtos';

export class GreenApiService {
  public static postMessage = async (
    client: GreenApiClient,
    opts: PostMessageDto
  ) => {
    const messageInstance = plainToInstance(PostMessageDto, opts);

    const limiter = new Bottleneck.Group({
      maxConcurrent: 1,
      minTime: 1000
    });

    try {
      await validate(messageInstance);
      return await limiter
        .key(client.idInstance)
        .schedule(async () => await client.postMessage(messageInstance));
    } catch (err: any) {
      this.handleError(err);
    }
  };

  public static getChatHistory = async (
    client: GreenApiClient,
    opts: GetChatHistoryDto
  ) => {
    const credsInstance = plainToInstance(GetChatHistoryDto, opts);

    const limiter = new Bottleneck.Group({
      maxConcurrent: 1,
      minTime: 1000
    });

    try {
      await validate(credsInstance);
      return await limiter
        .key(client.idInstance)
        .schedule(async () => await client.getChatHistory(credsInstance));
    } catch (err: any) {
      this.handleError(err);
    }
  };

  private static handleError(err: any) {
    // Тут должна быть обработка ошибок, я пока просто тост вставил
    toast.error(JSON.stringify(err.message));
  }
}
