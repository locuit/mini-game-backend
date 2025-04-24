import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get top 20 leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard data' })
  async getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }

  @Get('rank')
  @ApiOperation({ summary: 'Get rank for a specific score' })
  @ApiQuery({ name: 'score', type: Number })
  @ApiResponse({ status: 200, description: 'Rank position' })
  async getRank(@Query('score') score: string) {
    return this.leaderboardService.getRank(+score);
  }
}