import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonacciService {
  fibonacci(n) {
    if (n <= 1) {
      return 1;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
