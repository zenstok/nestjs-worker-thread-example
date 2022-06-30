import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [FibonacciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
