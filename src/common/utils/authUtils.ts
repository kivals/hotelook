import * as crypto from 'crypto';
import { IAuthCryptoConfig } from '../../modules/auth/interfaces/IAuthCryptoConfig.interface';

export function generateHashPassword(
  authConfig: IAuthCryptoConfig,
  password: string,
): string {
  return crypto
    .pbkdf2Sync(
      password,
      authConfig.salt,
      authConfig.iterations,
      authConfig.length,
      authConfig.digest,
    )
    .toString('hex');
}
