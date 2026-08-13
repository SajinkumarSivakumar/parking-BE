import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PermissionMetaDocument =
    HydratedDocument<PermissionsMeta>;

@Schema({
    timestamps: true,
})
export class PermissionsMeta {

    @Prop({ required: true })
    permissionId: Types.ObjectId;

    @Prop({ required: true })
    Dashboard: boolean;

    @Prop({ required: true })
    Master: boolean;

    @Prop({ required: true })
    VehicleEntry: boolean;

    @Prop({ required: true })
    VehicleExit: boolean;

    @Prop({ required: true })
    ParkingSlots: boolean;

    @Prop({ required: true })
    Customers: boolean;

    @Prop({ required: true })
    Payments: boolean;

    @Prop({ required: true })
    Reports: boolean;

    @Prop({ required: true })
    Settings: boolean;
}

export const PermissionsMetaSchema =
    SchemaFactory.createForClass(PermissionsMeta);