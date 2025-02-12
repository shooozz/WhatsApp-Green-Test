import {
  GreenApiClient,
  GreenApiMessageDto,
  GreenApiCredsDto
} from '@/shared/api/green-api/green-api-client';
import { plainToInstance } from 'class-transformer';
import { toast } from 'react-toastify';
import { validate } from 'class-validator';
import Bottleneck from 'bottleneck';

export class GreenApiService {
  public static postMessage = async (
    client: GreenApiClient,
    opts: GreenApiMessageDto
  ) => {
    const messageInstance = plainToInstance(GreenApiMessageDto, opts);

    const limiter = new Bottleneck.Group({
      maxConcurrent: 1,
      minTime: 1000
    });

    try {
      await validate(messageInstance);
      return await limiter
        .key(messageInstance.apiTokenInstance)
        .schedule(async () => await client.postMessage(messageInstance));
    } catch (err: any) {
      this.handleError(err);
    }
  };

  public static getChatHistory = async (
    client: GreenApiClient,
    opts: GreenApiCredsDto
  ) => {
    const credsInstance = plainToInstance(GreenApiCredsDto, opts);

    const limiter = new Bottleneck.Group({
      maxConcurrent: 1,
      minTime: 1000
    });

    try {
      await validate(credsInstance);
      return await limiter
        .key(credsInstance.apiTokenInstance)
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
