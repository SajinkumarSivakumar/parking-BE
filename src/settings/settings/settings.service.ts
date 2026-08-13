import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Register, RegisterDocument} from "../../schema/register.schema";
import {Permissions, PermissionsDocument} from "../../schema/permissions.schema";
import {PermissionMetaDocument, PermissionsMeta} from "../../schema/permissions-meta.schema";

@Injectable()
export class SettingsService {


    constructor(
        @InjectModel(Register.name)
        private readonly registerModel: Model<RegisterDocument>,
        @InjectModel(Permissions.name)
        private readonly permissionModel: Model<PermissionsDocument>,
        @InjectModel(PermissionsMeta.name)
        private readonly permissionsMetaModel: Model<PermissionMetaDocument>,



    ) {
    }


    async userSave(data: any) {
        try {

            if (data.password !== data.confirmPassword) {
                throw new BadRequestException(
                    'Password and Confirm Password do not match',
                );
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const register = new this.registerModel({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobile: data.mobile,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                dob: data.dob,
                gender: data.gender,
                branch: data.branch,
                department: data.department,
                role: data.role,
                joiningDate: data.joiningDate,
                status: data.status,
                photo: data.photo,
                fileName: data.fileName,
                fileSize: data.fileSize,
                fileType: data.fileType,
            });

            const result = await register.save();
            return result;

        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    async fetchUserInfo(){
        return this.registerModel.find()
    }



    async editStatus(id: any) {
        const result = await this.registerModel.findOneAndUpdate(
            { _id: id },
            { status: 'Inactive' },
            { new: true }
        );

        return result;
    }


    async statusChangeInActive(id: any) {
        const result = await this.registerModel.findOneAndUpdate(
            { _id: id },
            { status: 'Active' },
            { new: true }
        );

        return result;
    }


    async savePermission(data:any){

       try{

           const permission = new this.permissionModel({
               userName: data.userName,
               role: data.role,
               status: data.status
           });

           const result = await permission.save();
           const permissionId = result._id;

       //     save metaData

           const metaDetails = data.permissions

             for(let i=0;i<metaDetails.length;i++){

                 const metaData = {
                     permissionId: permissionId,

                     Dashboard: metaDetails.find(
                         item => item.menuId === 1
                     )?.view ?? false,

                     Master: metaDetails.find(
                         item => item.menuId === 2
                     )?.view ?? false,


                     VehicleEntry: metaDetails.find(
                         item => item.menuId === 3
                     )?.view ?? false,

                     VehicleExit: metaDetails.find(
                         item => item.menuId === 4
                     )?.view ?? false,

                     ParkingSlots: metaDetails.find(
                         item => item.menuId === 5
                     )?.view ?? false,

                     Customers: metaDetails.find(
                         item => item.menuId === 6
                     )?.view ?? false,

                     Payments: metaDetails.find(
                         item => item.menuId === 7
                     )?.view ?? false,

                     Reports: metaDetails.find(
                         item => item.menuId === 8
                     )?.view ?? false,

                     Settings: metaDetails.find(
                         item => item.menuId === 9
                     )?.view ?? false
                 };

                 const metaResult =
                     await this.permissionsMetaModel.create(metaData);

                 return {
                     permission: result,
                     meta: metaResult
                 };


             }
           return result;


       }catch (err) {
           console.error('Save Permission Error:', err);

           throw err;
       }

    }


    async getPermissionDetails(){
        return this.permissionModel.find()
    }


    async getEditPermissions(id:any){

        const permissionId = new Types.ObjectId(id);

        const permissions = await this.permissionModel.findOne({
            _id: id
        });

        const permissionsmeta = await this.permissionsMetaModel.findOne({
            permissionId: permissionId
        });


        return {
            permissions,
            permissionsmeta
        };
    }


    async updatePermission(data: any) {

        try {

            const permissionId = new Types.ObjectId(data.id);


            const permission =
                await this.permissionModel.findOneAndUpdate(
                    {
                        _id: permissionId
                    },
                    {
                        userName: data.userName,
                        role: data.role,
                        status: data.status
                    },
                    {
                        new: true
                    }
                );


            if (!permission) {

                throw new BadRequestException(
                    'Permission not found'
                );

            }




            const metaDetails = data.permissions;




            const metaData = {

                Dashboard:
                    metaDetails.find(
                        item => item.menuId === 1
                    )?.view ?? false,

                Master:
                    metaDetails.find(
                        item => item.menuId === 2
                    )?.view ?? false,

                VehicleEntry:
                    metaDetails.find(
                        item => item.menuId === 3
                    )?.view ?? false,

                VehicleExit:
                    metaDetails.find(
                        item => item.menuId === 4
                    )?.view ?? false,

                ParkingSlots:
                    metaDetails.find(
                        item => item.menuId === 5
                    )?.view ?? false,

                Customers:
                    metaDetails.find(
                        item => item.menuId === 6
                    )?.view ?? false,

                Payments:
                    metaDetails.find(
                        item => item.menuId === 7
                    )?.view ?? false,

                Reports:
                    metaDetails.find(
                        item => item.menuId === 8
                    )?.view ?? false,

                Settings:
                    metaDetails.find(
                        item => item.menuId === 9
                    )?.view ?? false

            };




            const permissionMeta =
                await this.permissionsMetaModel.findOneAndUpdate(
                    {
                        permissionId: permissionId
                    },
                    metaData,
                    {
                        new: true
                    }
                );


            if (!permissionMeta) {

                throw new BadRequestException(
                    'Permission meta not found'
                );

            }




            return {
                permission,
                permissionsmeta: permissionMeta
            };


        } catch (err) {

            console.error(
                'Update Permission Error:',
                err
            );

            throw err;
        }
    }

}
