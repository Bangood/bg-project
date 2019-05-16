import { Component, Input } from '@angular/core';

import { GoodsService } from '../../../core/service/goods.service';
import { HTTP_PATTERN } from '../../../core/util/pattern.util';
@Component({
    selector: 'hyp-goods-list-editor',
    styleUrls: ['./goods-list-editor.component.scss'],
    templateUrl: './goods-list-editor.component.html',
    providers: [GoodsService],
})
export class GoodsListEditorComponent {
    @Input() goodsList: any[];
    @Input() isMobile = false;
    @Input() channelType = 99;
    urlPattern = HTTP_PATTERN;
    constructor(
        private _goodsService: GoodsService,
    ) { }
    isAutoInput: Boolean = false;
    onCellPrepared($event) {
        if ($event.rowType === 'data' && $event.column.command === 'edit') {
            const isEditing = $event.row.isEditing,
                cellElement = $event.cellElement;

            if (isEditing) {
                const saveLink = cellElement.querySelector('.dx-link-save'),
                    cancelLink = cellElement.querySelector('.dx-link-cancel');

                saveLink.classList.add('dx-icon-save');
                cancelLink.classList.add('dx-icon-revert');

                saveLink.textContent = '';
                cancelLink.textContent = '';
            } else {
                const editLink = cellElement.querySelector('.dx-link-edit'),
                    deleteLink = cellElement.querySelector('.dx-link-delete');

                editLink.classList.add('dx-icon-edit');
                deleteLink.classList.add('dx-icon-trash');

                editLink.textContent = '';
                deleteLink.textContent = '';
            }
        }
    }

    onEditorPreparing($event: any): void {
        if ($event.parentType === 'dataRow' && $event.dataField === 'GoodsId') {
            $event.editorOptions.readOnly = !$event.row.inserted;
        }
        if (!this.isAutoInput) {
            $event.editorOptions.disabled = false;
        }
        if ($event.dataField === 'GoodsUrl' && $event.parentType === 'dataRow') {
            const rowIndex = $event.row && $event.row.rowIndex;
            $event.editorOptions.onValueChanged = ($$event: any) => {
                const goodUrl = $$event.value;
                this._goodsService.queryGoods(goodUrl, this.channelType)
                    .then($res => {
                        if ($res !== undefined) {
                            this.isAutoInput = true;
                            $event.row.data['GoodsId'] = $res.GoodsId;
                            $event.row.data['Title'] = $res.Title;
                            $event.row.data['Biz30Day'] = $res.Biz30Day;
                            $event.row.data['CouponAmount'] = $res.CouponAmount;
                            $event.row.data['ActualPrice'] = $res.ActualPrice;
                            $event.row.data['PicUrl'] = $res.PicUrl;
                            $event.row.data['Price'] = $res.Price;
                            $event.row.data['SharePrice'] = $res.SharePrice;
                            $event.row.data['Timestamp'] = $res.Timestamp;
                            $event.row.data['Source'] = $res.Source;
                            $event.row.data['TotalCouponCnt'] = $res.TotalCouponCnt;
                            $event.row.data['RemainCouponCnt'] = $res.RemainCouponCnt;
                            $event.row.data['ShopName'] = $res.ShopName;
                            $event.component.cellValue(rowIndex, 'GoodsUrl', $res.GoodsUrl);
                        } else {
                            this.isAutoInput = false;
                            $event.component.cellValue(rowIndex, 'GoodsUrl', 'ss');
                        }


                    });
            };
        }
    }
    onRowInserting($event) {
        if (!this.isAutoInput) {
            $event.data.ActualPrice *= 100;
            $event.data.Price *= 100;
            $event.data.SharePrice *= 100;
            $event.data.CouponAmount *= 100;
        }
    }
    onInitNewRow($event) {
        this.isAutoInput = true;
    }
    onEditingStart($event) {
        this.isAutoInput = false;
    }
}
