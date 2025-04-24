import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessService {
  getHello(): string {
    return 'Hello World!';
  }
}
