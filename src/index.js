import config from 'config'
import bgLogger from 'bg-logger';
import {init as koaInit} from './utils/koa';
const logger = new bgLogger({env:process.env.NODE_ENV});
async function init(){
  koaInit(config.port);
}
init();