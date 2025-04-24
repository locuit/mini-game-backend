import { IsIP } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ description: 'Client IP address' })
  // @IsIP()
  clientIp: string;
}