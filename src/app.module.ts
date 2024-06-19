import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { CatsController } from './cats/cats.controller';
// 应用程序的根模块。模块类不能注入到提供者中。
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
