import { NestFactory } from '@nestjs/core';
import { workerData, parentPort } from 'worker_threads';
import { AppModule } from '../app.module';
import { FibonacciService } from '../fibonacci/fibonacci.service';
import { AppService } from '../app.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);
  const fibonacciService = app.get(FibonacciService);

  const fibonacciNumber: number = workerData;

  appService.checkMainThread();
  const fibonacciSum = fibonacciService.fibonacci(fibonacciNumber);
  parentPort.postMessage(fibonacciSum);
}

run();
