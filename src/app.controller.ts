import { Body, Controller, Get, Post, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CorpService } from './app.service';
import { PaginationSearchDto } from './dto';
import { Corp, Finance } from './entity';

@Controller()
export class AppController {
  constructor(
    private corpService: CorpService,
    private config: ConfigService
  ) { }

  @Post('/api/corp')
  async addAllCorp(@Body() data: any, @Res() res) {
    if (data.accessKey == this.config.get('ACCESS_KEY')) {
      await this.corpService.addAllCorp();
    } else {
      throw new UnauthorizedException('인증키가 올바르지 않습니다.')
    }
  }

  @Post('/api/finance')
  async addAllFinance(@Body() data: any, @Res() res) {
    if (data.accessKey == this.config.get('ACCESS_KEY')) {
      await this.corpService.addAllFinance();
    } else {
      throw new UnauthorizedException('인증키가 올바르지 않습니다.')
    }
  }

  @Get('/api/search/finance')
  async searchFinance(@Query() dto: PaginationSearchDto): Promise<Pagination<Finance>> {
    return await this.corpService.searchFinance(dto);
  }

  @Get('/api/search/corp')
  async searchCorp(@Query() dto: PaginationSearchDto): Promise<Pagination<Corp>> {
    return await this.corpService.searchCorp(dto);
  }
}
