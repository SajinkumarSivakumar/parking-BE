import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {MasterController} from "./master.controller";
import {MasterService} from "./master.service";
import {Branch, BranchSchema} from "../schema/branch.schema";

@Module({

    imports:[
        MongooseModule.forFeature([
            {name:Branch.name, schema: BranchSchema},
        ])
    ],

    controllers:[MasterController],
    providers:[MasterService],
})
export class MasterModule {}
