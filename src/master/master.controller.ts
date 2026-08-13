import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
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


}
