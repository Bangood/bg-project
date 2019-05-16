import { Component, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { DxFormComponent } from 'devextreme-angular';
import { CategoryService } from '../../../core/service/category.service';
import { QiniuService } from '../../../core/service/qiniu.service';
import { Category } from '../../../core/models/category.model';

@Component({
    selector: 'hyp-category',
    styleUrls: ['./category.component.scss'],
    templateUrl: './category.component.html',
    providers: [ConfirmationService, CategoryService, QiniuService]
})
export class CategoryComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    categoryList: Category[] = [];
    category: Category = new Category();
    currentIndex: number;
    popupVisible = false;
    value: any[] = [];
    uploadUrl: string;
    constructor(
        private _confirmationService: ConfirmationService,
        private _categoryService: CategoryService,
        private _qiniuService: QiniuService,
    ) {
        this._categoryService.queryCategory()
            .then(($res: Category[] = []) => this.categoryList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addCategory();
                break;
            case this.actionList.update.type:
                this.updateCategory();
                break;
        }
    }

    addCategory() {
        const data = [...this.categoryList, this.category];
        this._categoryService.set(data)
            .then($res => {
                this.categoryList = $res;
                this.popupVisible = false;
            });
    }

    updateCategory() {
        this.categoryList[this.currentIndex] = this.category;
        this._categoryService.set(this.categoryList)
            .then(() => this.popupVisible = false);
    }

    deleteCategory($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this.categoryList.splice($index, 1);
                this._categoryService.set(this.categoryList)
                    .then($res => this.categoryList = $res);
            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.category = new Category();
        } else {
            this.category = this.categoryList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.category.CatIcon = this._qiniuService.PIC_DOMAIN + key;
    }
}

