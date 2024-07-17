import { Get, Post, Body, Query,Put, Delete, Param, Controller, UsePipes, Logger } from '@nestjs/common';
import { UserService } from './cats.service';
// import { UserRO } from './user.interface';
import { CreateUserDto } from './create-user.dto';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { User } from './user.decorator';
// import { ValidationPipe } from '../shared/pipes/validation.pipe';

// import {
//   ApiBearerAuth, ApiTags
// } from '@nestjs/swagger';

// @ApiBearerAuth()
// @ApiTags('user')
@Controller('cats')
export class CatsController {
  private readonly logger = new Logger();
  constructor(private readonly userService: UserService) {
    
  }
    @Put()
    findOne(): string {
      return 'find oenoneone22222222';
    }
    @Post()
      async findAll(): Promise<any> {
        return await this.userService.findAll();
      }
      @Get()
    async create(@Query('user') userData: string) {
      return this.userService.create(JSON.parse(userData));
    }
}
