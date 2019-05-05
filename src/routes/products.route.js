import Router from 'koa-router';
import { list, renderPage, renderItem } from '../controllers/products.controller';
const router = new Router();
router.get('/', renderPage)
    .get('/:productId', renderItem)
    .get('/list', list);

export default router;