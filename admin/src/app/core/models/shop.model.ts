import { BriefGoods } from './briefGoods.model';

export class Shop {
    ShopId: string;
    ShopName: string;
    ShopLog: string;
    ShopBanner: string;
    GoodList: BriefGoods[] = [];
}
