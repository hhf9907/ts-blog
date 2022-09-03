const os = require('os')


export function randomCode(length: number) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var result = ""; //统一改名: alt + shift + R
  for (var i = 0; i < length; i++) {
    var index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}


//获取本机IP地址 的函数
export function getIpAddress() {
  var ifaces = os.networkInterfaces()

  for (var dev in ifaces) {
    let iface = ifaces[dev]

    for (let i = 0; i < iface.length; i++) {
      let { family, address, internal } = iface[i]

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address
      }
    }
  }
}