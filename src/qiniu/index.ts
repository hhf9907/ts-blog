import { Access } from './config'
import qiniu from 'qiniu'

const mac = new qiniu.auth.digest.Mac(Access.accessKey, Access.secretKey)
const options = {
  scope: 'coderhhf'
}

export function getUploadToken() {
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}
