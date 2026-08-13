import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Register, RegisterSchema} from "../schema/register.schema";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import { JwtModule } from '@nestjs/jwt';

@Module({

    imports: [
        MongooseModule.forFeature([
            { name: Register.name, schema: RegisterSchema },
        ]),

        JwtModule.register({
            secret: 'mySecretKey',
            signOptions: {
                expiresIn: '15m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
