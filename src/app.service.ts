import { Injectable } from '@nestjs/common';
// 带有单个方法的基本服务
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
