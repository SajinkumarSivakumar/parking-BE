import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register, RegisterDocument } from '../schema/register.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Register.name)
        private readonly registerModel: Model<RegisterDocument>,
        private jwtService: JwtService,
    ) {}




    async savelogin(body: any) {

        const user = await this.registerModel.findOne({
            email: body.email
        });

        if (!user) {
            throw new UnauthorizedException('Please register first.');
        }

        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid Email or Password');
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '15m'
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d'
        });

        return {
            message: 'Login Success',
            accessToken,
            refreshToken
        };
    }
}