import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
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
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
