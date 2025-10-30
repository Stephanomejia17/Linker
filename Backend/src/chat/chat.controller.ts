import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('token/:userId')
  async getToken(@Param('userId') userId: string) {
    const token = await this.chatService.generateUserToken(userId);
    return { token };
  }
}