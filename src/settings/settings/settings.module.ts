import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Register, RegisterSchema} from "../../schema/register.schema";
import {JwtModule} from "@nestjs/jwt";
import {SettingsController} from "./settings.controller";
import {SettingsService} from "./settings.service";
import {Permissions, PermissionSchema} from "../../schema/permissions.schema";
import {PermissionsMeta, PermissionsMetaSchema} from "../../schema/permissions-meta.schema";

@Module({

    imports:[
        MongooseModule.forFeature([
            { name: Register.name, schema: RegisterSchema },
            { name: Permissions.name, schema: PermissionSchema },
            { name: PermissionsMeta.name, schema: PermissionsMetaSchema },
        ]),
        JwtModule.register({
            secret: 'mySecretKey',
            signOptions: {
                expiresIn: '15m',
            },
        })
    ],

    controllers:[SettingsController],
    providers:[SettingsService],

})
export class SettingsModule {}
