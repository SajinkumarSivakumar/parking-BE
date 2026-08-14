import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Branch} from "../schema/branch.schema";
import {Model, Types} from "mongoose";
import {Counter} from "../schema/counter.schema";

@Injectable()
export class MasterService {

    constructor(
        @InjectModel(Branch.name)
        private readonly branchModel:Model<Branch>,
        @InjectModel(Counter.name)
        private readonly counterModel: Model<Counter>,
    ) {
    }


    async branchSave(data: any) {
        try {

            const counter = await this.counterModel.findOneAndUpdate(
                { name: 'branch' },
                { $inc: { sequence: 1 } },
                {
                    new: true,
                    upsert: true,
                }
            );

            const branchCode = `BR-${String(counter.sequence).padStart(3, '0')}`;

            const branch = new this.branchModel({
                branchName: data.branchName,
                branchCode: branchCode,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                contactNumber: data.contactNumber,
                emailAddress: data.emailAddress,
                status: data.status,
            });

            const result = await branch.save();

            return result;

        } catch (error) {
            throw error;
        }
    }


    async getAllBranchDetails(){
        return this.branchModel.find()
    }


    async getBranchparticularInfo(id:any){
        const branchInfo = await this.branchModel.findOne({
            _id: id
        });
        return {branchInfo};
    }

    async updateBranch(id: string, data: any) {
        try {

            const branch = await this.branchModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        branchName: data.branchName,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        pincode: data.pincode,
                        contactNumber: data.contactNumber,
                        emailAddress: data.emailAddress,
                        status: data.status,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );

            if (!branch) {
                throw new NotFoundException('Branch not found');
            }

            return {
                message: 'Branch updated successfully',
                branch,
            };

        } catch (error) {
            throw error;
        }
    }
}
