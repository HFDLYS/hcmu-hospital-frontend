import CryptoJS from 'crypto-js';

//    设置加密的密钥
const secretKey = 'secret_key';

//    加密
export function encode(data: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

//    解密
export function decode(data: string): string {
  return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
}
