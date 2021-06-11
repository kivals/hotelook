import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HotelModule } from './modules/hotel/hotel.module';
import * as Joi from 'joi';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        APP_PORT: Joi.number().positive().default(3000),
        DB_URL: Joi.string(),
        CRYPTO_SALT: Joi.string().min(6).max(128),
        CRYPTO_ITERATIONS: Joi.number().min(1),
        CRYPTO_LENGTH: Joi.number().default(128),
        CRYPTO_DIGEST: Joi.string().default('sha512'),
      }),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions;
      },
    }),
    HotelModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
