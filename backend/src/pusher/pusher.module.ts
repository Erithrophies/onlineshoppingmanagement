// src/pusher/pusher.module.ts
import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Module({
  providers: [PusherService],
  exports: [PusherService], // Must be exported to be usable by other modules
})
export class PusherModule {}