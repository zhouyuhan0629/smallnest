import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { UserService } from './cats.service';
// import { UserRO } from './user.interface';
// import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
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
  constructor(private readonly userService: UserService) {}
    @Get()
    findAll(): string {
      return 'This action returns all cats';
    }
    @Post()
      async findOne(@Body('name') name: string): Promise<any> {
        return await this.userService.findByEmail(name);
      }
}
