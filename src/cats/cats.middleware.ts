import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable,Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './cats.service';

@Injectable()
export class tokenMiddleware implements NestMiddleware {
    private readonly logger = new Logger();
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    this.logger.log(authHeaders); 
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const user = await this.userService.findById(Number(token));

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      next();

    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
