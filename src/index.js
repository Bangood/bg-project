import AlipaySdk from 'alipay-sdk';
import path from 'path';
import fs from 'fs';
console.log(path.resolve(__dirname,'../assets/private-key.pem'))
const alipaySdk = new AlipaySdk({
    appId: '2019042364291281',
    privateKey: fs.readFileSync(path.resolve(__dirname,'../assets/private-key.pem'),'ascii'),
    alipayPublicKey: fs.readFileSync(path.resolve(__dirname,'../assets/public-key.pem'),'ascii'),
});
async function dd(){
    try {
        const result = await alipaySdk.exec('alipay.system.oauth.token', {
          grantType: 'authorization_code',
          code: 'code',
          refreshToken: 'token'
        }, {
          // 验签
          validateSign: true,
          // 打印执行日志
          log: console,
        });
      
        // result 为 API 介绍内容中 “响应参数” 对应的结果
        console.log(result);
      } catch (err) {
        //...
        console.error(err);
      }
}
dd();