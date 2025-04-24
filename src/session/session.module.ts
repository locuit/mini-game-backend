import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { Session, SessionSchema } from '../entities/session.entity';
import { Score, ScoreSchema } from '../entities/score.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Score.name, schema: ScoreSchema },
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}