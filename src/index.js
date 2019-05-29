import config from 'config'
import {init as koaInit} from './utils/koa';
async function init(){
  koaInit(config.port);
}
init();