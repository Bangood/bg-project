import AlipaySdk from 'alipay-sdk';
import path from 'path';
import fs from 'fs';
import {init as koaInit} from './utils/koa';
// const alipaySdk = new AlipaySdk({
//     appId: '2019042364291281',
//     privateKey: fs.readFileSync(path.resolve(__dirname,'../assets/private-key.pem'),'ascii'),
//     alipayPublicKey: fs.readFileSync(path.resolve(__dirname,'../assets/public-key.pem'),'ascii'),
// });

async function check(){
  
}
async function init(){
  koaInit(8000);
}
init();