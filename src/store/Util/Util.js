import CryptoJs from 'crypto-js'
const secretKey=import.meta.env.VITE_SECRET_KEY

export const encryptData=(data)=>{
    return CryptoJs.AES.encrypt(JSON.stringify(data),secretKey).toString()
}
export const decryptData=(cipherText)=>{
    if(!cipherText) return null;
    const bytes=CryptoJs.AES.decrypt(cipherText,secretKey)
    return JSON.parse(bytes.toString(CryptoJs.enc.Utf8))
}

