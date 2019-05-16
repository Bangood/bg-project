import { BriefGoods } from './briefGoods.model';

export class Circle {
    Id: string;
    UserName: string;
    UserHead: string;
    UserId: string;
    TextContent: string;
    GoodList: BriefGoods[] = [];
    Timestamp: number;
}
