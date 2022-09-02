import crypto from 'crypto';
import { randomCode } from '../utils/util'
class CodeManager {
  // 秘钥，任意8位字符串
  key = 's8cks92c';

  // 加密
  _encrypt(message: string) {
    const cipher = crypto.createCipheriv('des-ecb', Buffer.from(this.key), Buffer.alloc(0));
    cipher.setAutoPadding(true)
    let ciph = cipher.update(message, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
  }

  // 解密
  _decrypt(message: string) {
    const keyHex = Buffer.from(this.key);
    const cipher = crypto.createDecipheriv('des-ecb', keyHex, Buffer.alloc(0));
    let c = cipher.update(message, 'base64', 'utf8');
    c += cipher.final('utf8');
    return c;
  }

  // 生成随机四位数，作为验证码
  _random4() {
    const getRandom = () => Math.floor(Math.random() * 10);
    return [getRandom(), getRandom(), getRandom(), getRandom()].join('');
  }

  // 生成验证码和token
  generate(email: string) {
    const time = Date.now();
    const code = randomCode(6);
    const token = this._encrypt(`${email}&${code}&${time}`);

    return { code, token };
  }

  // 校验验证码
  verify(email: string, code: string, token: string) {
    let text = '';
    try {
      text = this._decrypt(token);
    }
    catch (e) {
      e;
    }
    if (text) {
      const [emailFromToken, codeFromToken, timeFromToken] = text.split('&');
      return emailFromToken === email && codeFromToken === code
        // 10分钟有效期
        && Date.now() - Number(timeFromToken) < 10 * 6 * 1000;
    }
    return false;
  }
}

export default new CodeManager