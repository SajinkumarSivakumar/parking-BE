import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegisterDocument = HydratedDocument<Register>;

@Schema({
    timestamps: true,
})
export class Register {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    mobile: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    confirmPassword: string;


    @Prop({ required: true })
    dob: string;

    @Prop({ required: true })
    gender: string;



    @Prop({ required: true })
    branch: string;

    @Prop({ required: true })
    department: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    joiningDate: string;


    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    fileName: string;

    @Prop({ required: true })
    fileSize: string;

    @Prop({ required: true })
    fileType: string;

}

export const RegisterSchema = SchemaFactory.createForClass(Register);