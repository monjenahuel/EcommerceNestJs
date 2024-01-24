import { Injectable } from '@nestjs/common';

@Injectable()
export class BlueService {
  getBlue(): number {
    return 1000;
  }
}