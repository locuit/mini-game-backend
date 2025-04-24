import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitScoreDto {
  @ApiProperty({ description: 'Session ID' })
  @IsString()
  sessionId: string;

  @ApiProperty({ description: 'Score achieved' })
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'Time played in seconds', required: false })
  @IsOptional()
  @IsNumber()
  timePlayed?: number;
}