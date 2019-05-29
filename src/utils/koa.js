import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Compose from 'koa-compose';
import Respond from 'koa-respond';
import Views from 'koa-views';
import router from '../routes';
import path from 'path';
import Static from 'koa-static';
import Cors from '@koa/cors';
import Jwt from 'koa-jwt';
import Helmet from 'koa-helmet';
import Conditional from 'koa-conditional-get';
import Etag from 'koa-etag';
import bgLogger from 'bg-logger';
const logger = new bgLogger({env:process.env.NODE_ENV});
const app = new Koa();
const allMidlewares = Compose([
    Helmet(),
    Conditional(),
    Etag(),
    Respond(),
    BodyParser({ enableTypes: ['json', 'form'] }),
    Cors(),
    Static(path.join(__dirname, '../../assets')),
    Views(__dirname + '/../views', {
        extension: 'html'
    }),
    Jwt({ secret: '#production#Bangood#' }).unless({
        path: [/^\/v1\/auth\/login/,
            /^\/v1\/auth\/register/,
            /\/v1\/product\/public/,
            /^\/v1\/products/,
            /^\/v1\/order\/public/,
            /^\/v1\/gateway/,
        ],
    }),
    router.routes(),
]);
app.use(allMidlewares);


global.userInfoMap = new Map();
export function init(port) {
    app.listen(port);
    logger.success(`listen on :${port}`);
}