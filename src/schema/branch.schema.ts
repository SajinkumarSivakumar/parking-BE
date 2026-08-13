import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Permissions} from "./permissions.schema";

export type branchDocument = HydratedDocument<Branch>

@Schema({ timestamps: true })

export class Branch {
    @Prop({ required: true })
    branchName: string;

    @Prop({ required: true })
    branchCode: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    pincode: string;

    @Prop({ required: true })
    contactNumber: string;

    @Prop({ required: true })
    emailAddress: string;

    @Prop({ required: true })
    status: string;
}

export const BranchSchema =
    SchemaFactory.createForClass(Branch);