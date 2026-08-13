import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { SettingsController } from './settings/settings/settings.controller';
import { SettingsService } from './settings/settings/settings.service';
import { SettingsModule } from './settings/settings/settings.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/CarParking'),
      AuthModule,
      SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
