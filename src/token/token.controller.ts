import { Get, Post, Body, Query,Put, Delete, Param, Controller, UsePipes, Logger } from '@nestjs/common';
@Controller('api/v1/getAccessToken')
export class TokenController {
    @Get()
    async create() {
        return { access_token: 'YuHBdSlDXY000xa8IlCm7Qgq4_s' };
    }
}
