import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { DxDataGridModule } from 'devextreme-angular';
import { GoodsListEditorComponent } from './goods-list-editor/goods-list-editor.component';
const components = [
    GoodsListEditorComponent,
];
@NgModule({
    imports: [
        NgCommonModule,
        DxDataGridModule,
    ],
    declarations: [...components],
    exports: [...components],
})
export class CommonModule { }
