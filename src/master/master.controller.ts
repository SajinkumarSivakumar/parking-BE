import {Body, Controller, Get, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {MasterService} from "./master.service";

@Controller('master')
export class MasterController {

    constructor(private ms:MasterService) {
    }


    @Post('save/branch')
    async saveBranch(@Body() body: any, @Res() res) {
        try{
            const branchSave = await this.ms.branchSave(body)
            if(branchSave){
                return res.status(201).json({
                    status: true,
                    msg: 'Branch Saved Successfully',
                    data: branchSave,
                });
            }
        }catch(err){
            return res.status(500).json({
                status: false,
                message: err.message,

            });

        }

    }



    @Get('getAllBranchDetails')
    async getAllBranchDetails(@Req() req, @Res() res) {
        const fetchBranchInfo = await this.ms.getAllBranchDetails()
        if(fetchBranchInfo){
            return res.status(200).send({
                status: true,
                msg: 'Fetch Branch Info',
                branchDetails: fetchBranchInfo,
            });
        }
    }



    @Get('getBranchparticularInfo')
    async getBranchparticularInfo(
        @Query('id') id: string,
        @Res() res
    ) {

        const branchInfo = await this.ms.getBranchparticularInfo(id);

        if (!branchInfo) {
            return res.status(404).send({
                status: false,

            });
        }

        return res.status(200).send({
            status: true,
            branchDetails: branchInfo
        });

    }


    @Put('branch/:id')
    async updateBranch(
        @Param('id') id: string,
        @Body() data: any,
    ) {
        return await this.ms.updateBranch(id, data);
    }

}
