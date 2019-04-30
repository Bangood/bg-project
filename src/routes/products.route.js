import Router from 'koa-router';
import {list,renderPage} from '../controllers/products.controller';
const router = new Router();
router.get('/',renderPage)
.get('/list',list);

export default router;