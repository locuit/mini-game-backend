import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Score extends Document {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  score: number;

  @Prop()
  timePlayed?: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

// Indexes for leaderboard
ScoreSchema.index({ score: -1 });
ScoreSchema.index({ sessionId: 1 });