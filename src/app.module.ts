import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FeedbackModule } from './feedback/feedback.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        connectString: config.get<string>('DB_CONNECT_STRING'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),

    FeedbackModule,
    NotificationsModule,
  ],
})
export class AppModule {}