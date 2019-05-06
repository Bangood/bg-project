import Router from 'koa-router';
import { list, renderPage, renderItem, getAuthUrl, getProduct, saveOrder } from '../controllers/products.controller';
const router = new Router();
router.get('/', renderPage)
    .post('/list', list)
    .post('/getauthurl', getAuthUrl)
    .post('/saveorder', saveOrder)
    .post('/getproduct', getProduct)
    .get('/:productId', renderItem);


export default router;