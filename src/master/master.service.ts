import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Branch} from "../schema/branch.schema";
import {Model} from "mongoose";

@Injectable()
export class MasterService {

    constructor(
        @InjectModel(Branch.name)
        private readonly branchModel:Model<Branch>,
    ) {
    }


    async branchSave(data:any){
        try{
          const branch = new this.branchModel({
              branchName :data.branchName,
              branchCode:data.branchCode,
              address:data.address,
              city:data.city,
              state:data.state,
              pincode:data.pincode,
              contactNumber:data.contactNumber,
              emailAddress:data.emailAddress,
              status:data.status
          });
          const result  = await branch.save();
          return result
        }catch(error){
            throw error;
        }
    }


    async getAllBranchDetails(){
        return this.branchModel.find()
    }
}
