import { GreenApiClient } from '@/shared/api/green-api/green-api-client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import Bottleneck from 'bottleneck';
import { GetChatHistoryDto, PostMessageDto } from '@/shared/api/green-api/dtos';
import { handleError } from '@/shared/lib/error-handler';

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
      handleError(err);
    }
  };

  public static getChatHistory = async (
    client: GreenApiClient,
    opts: GetChatHistoryDto
  ) => {
    const chatHistInstance = plainToInstance(GetChatHistoryDto, opts);

    const limiter = new Bottleneck.Group({
      maxConcurrent: 1,
      minTime: 1000
    });

    try {
      await validate(chatHistInstance);
      return await limiter
        .key(client.idInstance)
        .schedule(async () => await client.getChatHistory(chatHistInstance));
    } catch (err: any) {
      handleError(err);
    }
  };
}
