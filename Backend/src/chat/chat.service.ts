import { Injectable } from '@nestjs/common';
import { StreamChat } from 'stream-chat';

@Injectable()
export class ChatService {
  private serverClient: StreamChat;

  constructor() {
    this.serverClient = StreamChat.getInstance(
      'ykgddvxenb23',
      '3wfnhef3xte3437m5ekngmrjxaa7ybcnxgu68sppnhpa8zsc5v3afv3fpfn33yp4',
    );
  }

  async createStreamUser(id: string, name: string, image?: string) {
    // try {
    //   await this.serverClient.upsertUser({
    //     id,
    //     name,
    //     image: image || `https://getstream.io/random_png/?id=${id}`,
    //   });
    //   return { success: true };
    // } catch (error) {
    //   console.error('Error al crear usuario en Stream:', error);
    //   return { success: false };
    // }

    return { success: true };
  }

  async generateUserToken(userId: string) {
    // return this.serverClient.createToken(userId);
    return 'TOKEN-TOKEN-TOKEN';
  }
}
