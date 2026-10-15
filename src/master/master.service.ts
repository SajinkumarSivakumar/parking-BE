import {Catch, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Branch} from "../schema/branch.schema";
import {Model, Types} from "mongoose";
import {Counter} from "../schema/counter.schema";
import {PermissionMetaDocument} from "../schema/permissions-meta.schema";
import {ParkingConfigurations} from "../schema/parkingConfigurations.schema";

@Injectable()
export class MasterService {

    constructor(
        @InjectModel(Branch.name)
        private readonly branchModel:Model<Branch>,
        @InjectModel(Counter.name)
        private readonly counterModel: Model<Counter>,
        @InjectModel(ParkingConfigurations.name)
        private readonly ParkingConfiguartionsModel: Model<ParkingConfigurations>,
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


    async saveParking(data){
     try{

         const saveParking = new this.ParkingConfiguartionsModel({
             branch:data.branch,
             parkingName:data.parkingName,
             parkingType:data.parkingType,
             totalFloors:data.totalFloors,
             totalCapacity:data.totalCapacity,
             status:data.status,
             city:data.city,
             address:data.address,
         });
         const result = await saveParking.save();
         return result;

     }catch(error){
         console.error(error);
         throw error;
     }
    }


    async fetchParkingInfo()    {
        return this.ParkingConfiguartionsModel.find()
    }




    async getPatchparkingConfigurations(id: string) {
        const result = await this.ParkingConfiguartionsModel.findOne({
            _id: id
        }).exec();



        return result;
    }




    async updateparkingConfiguration(id: string, data: any) {
        try {

            const parkingConfiguration = await this.ParkingConfiguartionsModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        branch: data.branch,
                        parkingName: data.parkingName,
                        parkingType: data.parkingType,
                        totalFloors: data.totalFloors,
                        totalCapacity: data.totalCapacity,
                        status: data.status,
                        city: data.city,
                        address: data.address,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );

            if (!parkingConfiguration) {
                throw new NotFoundException('Parking Configuration not found');
            }

            return {
                message: 'Parking Configuration updated successfully',
                parkingConfiguration,
            };

        } catch (error) {
            throw error;
        }
    }


}
