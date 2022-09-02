const nodemailer = require('nodemailer'); //引入模块

const transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  service: 'qq', //类型qq邮箱
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '1399859803@qq.com', // 发送方的邮箱
    pass: 'eicnnxqnywxkjebc' // smtp 的授权码
  }
});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

async function sendMail(email: string, code: string) {
  // 发送的配置项
  let mailOptions = {
    from: `"coderhhf登录"<1399859803@qq.com>`,// 发件人
    subject: '验证码',//邮箱主题
    to: email,//收件人，这里由post请求传递过来
    // 邮件内容，用html格式编写
    html: `
          <p>您好！</p>
          <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件</p>
         `
  };

  //发送函数
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return Promise.reject(false);
    } else {
      return Promise.resolve(info); //因为是异步 所有需要回调函数通知成功结果
    }
  });

}

export {
  sendMail
}