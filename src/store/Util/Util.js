// import CryptoJs from 'crypto-js'
// const secretKey=import.meta.env.VITE_SECRET_KEY

// export const encryptData=(data)=>{
//     return CryptoJs.AES.encrypt(JSON.stringify(data),secretKey).toString()
// }
// export const decryptData=(cipherText)=>{
//     if(!cipherText) return null;
//     const bytes=CryptoJs.AES.decrypt(cipherText,secretKey)
//     return JSON.parse(bytes.toString(CryptoJs.enc.Utf8))
// }



import CryptoJs from 'crypto-js';
const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (cipherText) => {
  if (!cipherText) return null;

  try {
    const bytes = CryptoJs.AES.decrypt(cipherText, secretKey);
    const decrypted = bytes.toString(CryptoJs.enc.Utf8);

    if (!decrypted) {
      console.warn('Empty decryption result — likely wrong key or plain text');
      return null;
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null; // gracefully handle corrupt data
  }
};
