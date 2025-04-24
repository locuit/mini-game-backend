import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto, SubmitScoreDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimiterMiddleware } from '../common/rate-limiter.middleware';
import { Request } from 'express';

@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @UseGuards(RateLimiterMiddleware)
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.createSession(createSessionDto);
  }

  @Post('score')
  @ApiOperation({ summary: 'Submit a score for a session' })
  @ApiResponse({ status: 201, description: 'Score submitted' })
  @UseGuards(RateLimiterMiddleware)
  async submitScore(@Body() submitScoreDto: SubmitScoreDto) {
    return this.sessionService.submitScore(submitScoreDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get recent play history' })
  @ApiResponse({ status: 200, description: 'Recent sessions' })
  async getHistory(@Req() request: Request) {
    const clientIp = request.ip;
    return this.sessionService.getHistory(clientIp);
  }
}