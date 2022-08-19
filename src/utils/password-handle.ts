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

export { md5password, generateUserId, generatePostId, generateCategoryId }