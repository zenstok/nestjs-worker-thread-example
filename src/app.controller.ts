import {
  Controller,
  Get,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  amIResponsive(): string {
    return 'Try calling this endpoint while the thread is calculating the fibonacci sum. If you receive this message it means the app is responsive. Call /runWorker?fibonacci=50 in a new tab and refresh this page.';
  }

  @Get('/runWorker')
  runWorker(@Query('fibonacci') fibonacci: string): string {
    const parsedFibonacci = parseInt(fibonacci);
    if (isNaN(parsedFibonacci)) {
      throw new UnprocessableEntityException('fibonacci must be a number!');
    }

    return this.appService.runWorker(parsedFibonacci);
  }
}
