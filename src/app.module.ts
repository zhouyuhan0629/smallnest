import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats/cats.controller';
import { UserService } from './cats/cats.service';
import { UserEntity } from './cats/cats.entity';
import { tokenMiddleware } from './cats/cats.middleware'; // 导入你的中间件
import { TokenController } from './token/token.controller';
import { MatchesController } from './matches/matches.controller';
// 应用程序的根模块。模块类不能注入到提供者中。
@Module({
  imports: [
     ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forFeature([UserEntity]), // 注册实体的存储库
  TypeOrmModule.forRootAsync({
    inject: [ConfigService], // 注入 ConfigService 以便获取配置信息
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [UserEntity], // 需要加载的实体类
      synchronize: true, // 设置为 true 时会自动创建数据库结构，生产环境慎用
    }),
  }),
  
    ],
  controllers: [AppController, CatsController, TokenController, MatchesController],
  providers: [AppService,UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('*'); // 应用到所有路由，也可以指定具体的路由或模块
  }
}
