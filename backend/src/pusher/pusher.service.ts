// src/pusher/pusher.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService implements OnModuleInit {
  private pusherClient: Pusher;

  onModuleInit() {
    this.pusherClient = new Pusher({
      appId: '2051721',
      key: 'ed149b108fecaa8310b2',
      secret: '8bb5e1a247a14b7eb3c4',
      cluster: 'mt1',
      useTLS: true,
    });
    console.log(' Pusher Channels initialized');
  }

// src/pusher/pusher.service.ts
async sendAdminNotification(title: string, body: string, deepLink?: string) {
  try {
    await this.pusherClient.trigger(
      'admin-notifications', // channel
      'admin-activity-event', // event
      {
        title,
        body,
        deep_link: deepLink || '',
      }
    );
    console.log(' Admin Pusher event sent:', { title, body, deep_link: deepLink });
  } catch (err) {
    console.error(' Failed to send admin notification:', err);
  }
}

  }

