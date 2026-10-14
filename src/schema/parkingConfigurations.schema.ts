import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Permissions} from "./permissions.schema";

export type parkingConfigurationDocument = HydratedDocument<ParkingConfigurations>

@Schema({ timestamps: true })

export class ParkingConfigurations {
    @Prop({ required: true })
    branch: string;

    @Prop({ required: true })
    parkingName: string;

    @Prop({ required: true })
    parkingType: string;

    @Prop({ required: true })
    totalFloors: string;

    @Prop({ required: true })
    totalCapacity: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    address: string;


}

export const ParkingConfigurationsSchema =
    SchemaFactory.createForClass(ParkingConfigurations);