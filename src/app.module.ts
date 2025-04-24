import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionModule } from './session/session.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      maxPoolSize: 10,
      retryAttempts: 10,
      retryDelay: 5000,
    }),
    ScheduleModule.forRoot(),
    SessionModule,
    LeaderboardModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
  }
}