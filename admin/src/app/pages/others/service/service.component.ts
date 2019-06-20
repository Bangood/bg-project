/**
 * Created by pure on 2018/2/2.
 */
import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TreeNode, ConfirmationService } from 'primeng/api';

import { OrderService } from '../../../core/service/order.service';
import { ProductService } from '../../../core/service/product.service';
import { AlipayService } from '../../../core/service/alipay.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'hyp-service',
  templateUrl: './service.component.html',
  providers: [OrderService, ProductService, ConfirmationService, AlipayService]
})
export class ServiceComponent implements OnDestroy {

  source: LocalDataSource = new LocalDataSource();
  interval: any;
  serviceList: TreeNode[];
  productList: any;
  orderList: any[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  sortOptions: any[];
  statusMap = ['冻结中', '已解冻', '已支付'];
  selectedOrder: any;
  displayDialog: boolean;
  environment = environment;
  constructor(
    private _OrderService: OrderService,
    private _ProductService: ProductService,
    private _AlipayService: AlipayService,
    private _confirmationService: ConfirmationService,
  ) {
    this._ProductService.list()
      .then(($res: any) => {
        if ($res !== undefined) {
          this.productList = $res.msg;
          console.log(this.productList);
          for (let i = 0; i < $res.msg.length; ++i) {
            this.productList[$res.msg[i]._id] = $res.msg[i].logoUrl;
          }
        }
      });
    this._OrderService.list().then(($res: any) => {
      if ($res !== undefined) {
        this.serviceList = $res;
        this.orderList = $res;
        console.log($res);
      }
    });
    this.sortOptions = [
      { label: '创建时间', value: '!createTime' },
      { label: '状态', value: 'status' },
      { label: '用户名', value: 'userName' },
      { label: '订单编号', value: '!outOrderNo' },
      { label: 'orn', value: '!outRequestNo' }
    ];
  }
  onSortChange(event) {
    const value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  tradePay(event, order) {
    console.log(order);
    this._confirmationService.confirm({
      message: '确定对该笔订单进行授权转支付吗？',
      accept: () => {
        this._AlipayService.tradePay({
          outTradeNo: order.outOrderNo,
          authNo: order.authNo,
          sellerId: '',
          buyerId: order.userId,
          storeId: '',
          totalAmount: order.totalFreezeAmount
        }).then($res => {
          console.log($res);
        });

      }
    });
  }
  fundAuthUnfreeze(event, order) {
    console.log(order)
    this._confirmationService.confirm({
      message: '确定对该笔订单进行资金授权解冻吗？',
      accept: () => {
        this._AlipayService.fundAuthUnfreeze({
          authNo: order.authNo,
          outRequestNo: order.outRequestNo,
          amount: order.totalFreezeAmount,
          remark: '解冻0.01元'
        })
          .then(res => {
          });
      }
    });
  }
  selectOrder(event: Event, order) {
    this.selectedOrder = order;
    this.displayDialog = true;
    event.preventDefault();
  }
  onDialogHide() {
    this.selectedOrder = null;
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
