import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './cats.entity';
import { Repository , DeleteResult } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
      ) {}

      async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
      }
      async findById(id: number): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
          where: { id: id },
      });
    
        if (!user) {
          const errors = {User: ' not found'};
          throw new HttpException({errors}, 401);
        }
    
        return user
      }
      async create(dto: CreateUserDto): Promise<any> {

        // check uniqueness of username/email
        const {name, sharedate} = dto;
        const qb = await this.userRepository
          .createQueryBuilder('user')
          .where('user.name = :name', { name })
          .orWhere('user.sharedate = :sharedate', { sharedate });
    
        const user = await qb.getOne();
    
        // if (user) {
        //   const errors = {name: 'Username and email must be unique.'};
        //   throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    
        // }
    
        // create new user
        let newUser = new UserEntity();
        newUser.name = name;
        newUser.sharedate = sharedate;
    
        const errors = await validate(newUser);
        if (errors.length > 0) {
          const _errors = {username: 'Userinput is not valid.'};
          throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
    
        } else {
          const savedUser = await this.userRepository.save(newUser);
          return  { data:savedUser,message:'创建成功' } 
        }
    
      }
}
