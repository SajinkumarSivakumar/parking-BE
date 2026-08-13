import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionsDocument = HydratedDocument<Permissions>;

@Schema({ timestamps: true })
export class Permissions {

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    status: string;
}

export const PermissionSchema =
    SchemaFactory.createForClass(Permissions);