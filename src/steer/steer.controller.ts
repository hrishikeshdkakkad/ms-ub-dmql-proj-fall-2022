import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-response.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context.dto';

import { CustomerCreateDto } from './dtos/customer-create.dto';
import { SteerService } from './steer.service';

@Controller('steer')
export class SteerController {
  constructor(
    private readonly steerService: SteerService,
    private readonly logger: AppLogger,
  ) {}

  @Post('customer')
  @ApiOperation({
    summary: 'Add new Customer',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async createCustomer(
    @ReqContext() ctx: RequestContext,
    @Body() input: CustomerCreateDto,
  ): Promise<BaseApiResponse<unknown>> {
    const customer = await this.steerService.createCustomer(input);
    return { data: customer, meta: {} };
  }
}
