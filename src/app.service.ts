import { Injectable, Logger } from '@nestjs/common';
import { Worker, isMainThread } from 'worker_threads';
import workerThreadFilePath from './worker-threads/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  checkMainThread() {
    this.logger.debug(
      'Are we on the main thread here?',
      isMainThread ? 'Yes.' : 'No.',
    );
  }

  // do not run this from the worker thread or you will spawn an infinite number of threads in cascade
  runWorker(fibonacci: number): string {
    this.checkMainThread();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisService = this;
    const worker = new Worker(workerThreadFilePath, {
      workerData: fibonacci,
    });
    worker.on('message', (fibonacciSum) => {
      thisService.logger.verbose('Calculated sum', fibonacciSum);
    });
    worker.on('error', (e) => console.log('on error', e));
    worker.on('exit', (code) => console.log('on exit', code));

    return 'Processing the fibonacci sum... Check NestJS app console for the result.';
  }
}
