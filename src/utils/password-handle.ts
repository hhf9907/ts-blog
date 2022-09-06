const crypto = require('crypto')
const CryptoJS = require('crypto-js')

const guid = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

const md5password = (password: string): string => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

// 生成userId
const generateUserId = (): string => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(guid()).digest('hex')
  return result
}

// 生成文章id
const generatePostId = (): string => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(guid()).digest('hex')
  return 'P' + result
}

// 生成分类id
const generateCategoryId = (): string => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(guid()).digest('hex')
  return 'C' + result
}

// const keyStr = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') //十六位十六进制数作为密钥偏移量
//解密
// export function decrypt(word, keyStr){
function decrypt(word: string, keyStr: string) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)

  const decrypt = CryptoJS.AES.decrypt(srcs, keyStr, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

//加密
// export function encrypt(word, keyStr){
function encrypt(word: string, keyStr: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, keyStr, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

export {
  md5password,
  generateUserId,
  generatePostId,
  generateCategoryId,
  decrypt,
  encrypt
}
