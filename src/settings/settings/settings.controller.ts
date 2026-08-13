import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UploadedFile,
    UseInterceptors,
    Query, Put
} from '@nestjs/common';
import {SettingsService} from "./settings.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path';



@Controller('settings')
export class SettingsController {

    constructor(private settings:SettingsService) {
    }






    @Post('save/user')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + extname(file.originalname);
                    cb(null, uniqueName);
                },
            }),
        }),
    )
    async saveUser(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
        @Res() res,
    ) {
        try {
            if (file) {
                body.photo = file.filename;
                body.fileName = file.originalname;
                body.fileSize = file.size;
                body.fileType = file.mimetype;
            }

            const result = await this.settings.userSave(body);

            console.log(result);

            return res.status(201).json({
                status: true,
                msg: 'User Saved Successfully',
                data: result,
            });
        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                message: err.message,

            });
        }
    }



    @Get('getUserManagementDetails')
    async fetchUserManagementDetails(@Req() req, @Res() res) {
     const fetchUserInfo = await this.settings.fetchUserInfo()
        if(fetchUserInfo){
            return res.status(200).send({
                status: true,
                msg: 'Fetch User Info',
                userDetails: fetchUserInfo,
            });
        }
    }





    @Get('editStatus')
    async editStatus(
        @Query('id') id: string,
        @Res() res
    ) {

        const user = await this.settings.editStatus(id);

        if (!user) {
            return res.status(404).send({
                status: false,
                msg: 'Status Change SuccessFully'
            });
        }

        return res.status(200).send({
            status: true,
            msg: 'Status Change Details',
            userDetails: user
        });

    }



    @Get('statusChangeInActive')
    async statusChangeInActive(
        @Query('id') id: string,
        @Res() res
    ) {

        const user = await this.settings.statusChangeInActive(id);

        if (!user) {
            return res.status(404).send({
                status: false,
                msg: 'Status Change SuccessFully'
            });
        }

        return res.status(200).send({
            status: true,
            msg: 'Status Change Details',
            userDetails: user
        });

    }

    @Post('saveRolePermissions')
    async saveRolePermissions(
        @Body() body: any,
        @Res() res: any
    ) {

        try {

            const savePermissions = await this.settings.savePermission(body);
            return res.status(200).json({
                status: true,
                message: 'Role permissions saved successfully',
                data: savePermissions
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Failed to save role permissions',
                error: error.message
            });

        }

    }



    @Get('getPermissionDetails')
    async getPermissionDetails(@Req() req, @Res() res) {
        const fetchPermissionInfo = await this.settings.getPermissionDetails()
        if(fetchPermissionInfo){
            return res.status(200).send({
                status: true,
                msg: 'Fetch Permissions Info',
                userDetails: fetchPermissionInfo,
            });
        }
    }



    @Get('getEditPermissions')
    async getEditPermissions(
        @Query('id') id: string,
        @Res() res
    ) {

        const user = await this.settings.getEditPermissions(id);

        if (!user) {
            return res.status(404).send({
                status: false,

            });
        }

        return res.status(200).send({
            status: true,
            userDetails: user
        });

    }


    @Put('updateRolePermissions')
    async updateRolePermissions(
        @Body() body: any,
        @Res() res: any
    ) {

        try {

            const result =
                await this.settings.updatePermission(body);

            return res.status(200).json({
                status: true,
                message: 'Permissions updated successfully',
                data: result
            });

        } catch (err) {

            console.error('Update Permission Error:', err);

            return res.status(500).json({
                status: false,
                message: 'Failed to update permissions',
                error: err.message
            });

        }

    }

}
