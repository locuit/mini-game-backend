import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ default: [] })
  scores: Array<{
    score: number;
    timePlayed?: number;
    timestamp: Date;
  }>;

  @Prop()
  clientIp: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

// Indexes for performance
SessionSchema.index({ sessionId: 1 });
SessionSchema.index({ 'scores.score': -1 });