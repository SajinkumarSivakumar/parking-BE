import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private auth:AuthService) {
    }




    @Post('save/login')
    async savelogin(@Body() body: any, @Res() res) {
        const result = await this.auth.savelogin(body);
        if(result){
            return res.status(200).send({
                status: true,
                message: result.message,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        }
    }
}
