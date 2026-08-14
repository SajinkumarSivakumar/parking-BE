import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {MasterController} from "./master.controller";
import {MasterService} from "./master.service";
import {Branch, BranchSchema} from "../schema/branch.schema";
import {Counter, CounterSchema} from "../schema/counter.schema";

@Module({

    imports:[
        MongooseModule.forFeature([
            {name:Branch.name, schema: BranchSchema},
            { name: Counter.name, schema: CounterSchema },
        ])
    ],

    controllers:[MasterController],
    providers:[MasterService],
})
export class MasterModule {}
