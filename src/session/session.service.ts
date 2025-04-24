import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '../entities/session.entity';
import { Score } from '../entities/score.entity';
import { CreateSessionDto, SubmitScoreDto } from './dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Score.name) private scoreModel: Model<Score>,
  ) {}

  async createSession(dto: CreateSessionDto) {
    const sessionId = uuidv4();
    const session = new this.sessionModel({
      sessionId,
      clientIp: dto.clientIp,
      scores: [],
    });
    await session.save();
    return { sessionId };
  }

  async submitScore(dto: SubmitScoreDto) {
    const session = await this.sessionModel.findOne({ sessionId: dto.sessionId });
    if (!session) {
      throw new BadRequestException('Invalid session ID');
    }

    const scoreEntry = {
      score: dto.score,
      timePlayed: dto.timePlayed,
      timestamp: new Date(),
    };

    // Update session scores
    await this.sessionModel.updateOne(
      { sessionId: dto.sessionId },
      { $push: { scores: scoreEntry } },
    );

    // Save to leaderboard
    await new this.scoreModel({
      sessionId: dto.sessionId,
      score: dto.score,
      timePlayed: dto.timePlayed,
    }).save();

    return { message: 'Score submitted successfully' };
  }

  async getHistory(clientIp: string) {
    const sessions = await this.sessionModel
      .find({ clientIp })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('sessionId scores');
    return sessions;
  }
}