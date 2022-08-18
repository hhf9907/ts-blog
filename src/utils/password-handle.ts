const crypto = require('crypto');

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

const generateUserId = (): string => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(guid()).digest('hex')
  return result
}

export { md5password, generateUserId }