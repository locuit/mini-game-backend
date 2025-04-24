import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from '../entities/score.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LeaderboardService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async getLeaderboard() {
    return this.scoreModel
      .find()
      .sort({ score: -1 })
      .limit(20)
      .select('sessionId score timePlayed');
  }

  async getRank(score: number) {
    const count = await this.scoreModel.countDocuments({
      score: { $gt: score },
    });
    return { rank: count + 1 };
  }

  @Cron(CronExpression.EVERY_WEEK)
  async resetLeaderboard() {
    await this.scoreModel.deleteMany({});
  }
}