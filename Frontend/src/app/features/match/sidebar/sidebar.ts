import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StreamChat, Channel, Event, EventHandler } from 'stream-chat';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit, AfterViewChecked, OnDestroy {
  client!: StreamChat;
  channel: Channel | null = null;
  messages: any[] = [];
  newMessage: string = '';
  userId: string = '';
  chats: Channel[] = [];
  private shouldScroll = true;
  private eventListeners: Array<() => void> = [];
  private messageHandler?: EventHandler;
  private pollingInterval?: any;
  private lastCheckDate: Date = new Date();
  private knownMatchIds: Set<string> = new Set();

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  async ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;
    this.userId = userId;

    try {
      const response = await fetch(`http://localhost:3000/chat/token/${userId}`);
      const data = await response.json();
      const userToken = data.token;

      this.client = StreamChat.getInstance('ykgddvxenb23');

      await this.client.connectUser(
        {
          id: userId,
          name: 'Usuario ' + userId,
        },
        userToken
      );

      await this.initializeExistingMatches();
      await this.loadChats();
      this.listenToGlobalEvents();
      this.startMatchPolling();

    } catch (error) {
      console.error('Error al inicializar el chat:', error);
    }
  }

  async initializeExistingMatches() {
    try {
      const res = await fetch(`http://localhost:3000/matches/usuario/${this.userId}`);
      
      if (!res.ok) {
        console.error('Error en la respuesta del servidor:', res.status);
        return;
      }

      const matches = await res.json();
      
      console.log(`Cargados ${matches.length} matches`);

      for (const match of matches) {
        if (match.id_match) {
          this.knownMatchIds.add(match.id_match);
          
          await this.createChannelForMatch(match);
        }
      }

      this.lastCheckDate = new Date();
    } catch (err) {
      console.error('Error al cargar matches existentes:', err);
    }
  }

  startMatchPolling() {
    this.pollingInterval = setInterval(() => {
      this.checkForNewMatches();
    }, 30000);
  }

  async checkForNewMatches() {
    try {
      const url = `http://localhost:3000/matches/usuario/${this.userId}/nuevos?desde=${this.lastCheckDate.toISOString()}`;
      const res = await fetch(url);

      if (!res.ok) {
        console.error('Error verificando nuevos matches:', res.status);
        return;
      }

      const newMatches = await res.json();

      for (const match of newMatches) {
        if (match.id_match && !this.knownMatchIds.has(match.id_match)) {
          console.log('Nuevo match detectado:', match);
          
          this.knownMatchIds.add(match.id_match);

          await this.createChannelForMatch(match);
        }
      }

      this.lastCheckDate = new Date();

    } catch (err) {
      console.error('Error al verificar nuevos matches:', err);
    }
  }

  async createChannelForMatch(match: any) {
    try {
      const otherUserId = match.id_usuario_postulante === this.userId 
        ? match.id_usuario_empresa 
        : match.id_usuario_postulante;

      const channelId = `match-${match.id_match}`;

      const channel = this.client.channel('messaging', channelId, {
        members: [this.userId, otherUserId],
      });

      await channel.create();

      this.chats.unshift(channel);

    } catch (error: any) {
      if (error.code === 4) {
        await this.loadChats();
      } else {
        console.error('Error al crear canal:', error);
      }
    }
  }

  async loadChats() {
    const filter = { type: 'messaging', members: { $in: [this.userId] } };
    const sort = [{ last_message_at: -1 }] as any;
    
    const channels = await this.client.queryChannels(filter, sort, {
      watch: true,
      state: true,
    });

    this.chats = channels;

    if (channels.length > 0 && !this.channel) {
      await this.selectChat(channels[0]);
    }
  }

  listenToGlobalEvents() {
    const unsubscribeMessage = this.client.on('message.new', (event: Event) => {
      if (event.channel_id && event.message) {
        this.updateChatOrder(event.channel_id);
      }
    });

    const unsubscribeAdded = this.client.on('notification.added_to_channel', async () => {
      console.log('Agregado a un nuevo canal');
      await this.loadChats();
    });

    this.eventListeners.push(unsubscribeMessage.unsubscribe, unsubscribeAdded.unsubscribe);
  }

  updateChatOrder(channelId: string) {
    const channelIndex = this.chats.findIndex(c => c.id === channelId);
    if (channelIndex > 0) {
      const [channel] = this.chats.splice(channelIndex, 1);
      this.chats.unshift(channel);
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll && this.messagesContainer) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      setTimeout(() => {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }, 50);
    }
  }

  async selectChat(chat: Channel) {
    if (this.channel && this.messageHandler) {
      this.channel.off('message.new', this.messageHandler);
    }

    this.channel = chat;
    this.shouldScroll = true;

    try {
      await chat.markRead();

      const response = await chat.query({ messages: { limit: 50 } });
      this.messages = response.messages || [];

      this.messageHandler = (event: Event) => {
        if (event.message) {
          this.messages.push(event.message);
          this.shouldScroll = true;
          
          if (event.message.user?.id !== this.userId) {
            chat.markRead();
          }
        }
      };

      chat.on('message.new', this.messageHandler);

      this.scrollToBottom();
    } catch (error) {
      console.error('Error al cargar el chat:', error);
    }
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.channel) return;
    
    try {
      await this.channel.sendMessage({ 
        text: this.newMessage.trim() 
      });
      this.newMessage = '';
      this.shouldScroll = true;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  }

  getChannelName(channel: Channel): string {
    const channelData = channel.data as any;
    if (channelData?.name) {
      return channelData.name;
    }
    
    const members = Object.values(channel.state.members || {});
    const otherMember = members.find(m => m.user?.id !== this.userId);
    
    if (otherMember?.user?.name) {
      return otherMember.user.name;
    }
    
    return `Chat ${channel.id?.substring(0, 8)}`;
  }

  getLastMessage(channel: Channel): string {
    const messages = channel.state.messages || [];
    if (messages.length === 0) return 'Sin mensajes';
    
    const lastMsg = messages[messages.length - 1];
    const text = lastMsg.text || 'Mensaje enviado';
    
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
  }

  getMessageTime(message: any): string {
    if (!message.created_at) return '';
    
    const date = new Date(message.created_at);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.eventListeners.forEach(unsubscribe => unsubscribe());
    
    if (this.channel && this.messageHandler) {
      this.channel.off('message.new', this.messageHandler);
    }
    
    if (this.client) {
      this.client.disconnectUser();
    }
  }
}