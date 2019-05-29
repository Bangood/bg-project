import config from 'config'
import {init as koaInit} from './utils/koa';
console.log(config);
console.log(process.env.NODE_ENV)
async function init(){
  koaInit(config.port);
}
init();