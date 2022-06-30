import { Module } from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';

@Module({
  providers: [FibonacciService],
})
export class FibonacciModule {}
