export interface IAuthCryptoConfig {
  salt: string;
  iterations: number;
  length: number;
  digest: string;
}
