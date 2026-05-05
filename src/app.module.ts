import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FeedbackModule } from './feedback/feedback.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';
import { PaymentsModule } from './payments/payments.module';

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
    AdminModule,
    AuthModule,
    TicketsModule,
    EventsModule,
    PaymentsModule,
  ],
})
export class AppModule {}