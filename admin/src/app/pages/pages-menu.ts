/**
 * Created by pure on 2018/2/7.
 */
//
//
import { NbMenuItem } from '@nebular/theme';
const os = function () {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}();
let groupLink = '/pages/normal/circle';
if (!os.isPc) {
  groupLink = '/pages/normal/circle-detail-mobile';
}
export const ADMIN_MENU_ITEM: NbMenuItem[] = [
  // {
  //   title: '数据管理',
  //   icon: 'nb-keypad',
  //   link: '/pages/data',
  //   children: [
  //     {
  //       title: 'Banner管理',
  //       link: '/pages/data/banner-setting'
  //     }, {
  //       title: '分类管理',
  //       link: '/pages/data/category'
  //     }, {
  //       title: '频道管理',
  //       link: '/pages/data/channel'
  //     }, {
  //       title: '专场管理',
  //       link: '/pages/data/special-sell'
  //     }, {
  //       title: '店铺推广',
  //       link: '/pages/data/shop-expand'
  //     }, {
  //       title: '限时抢购',
  //       link: '/pages/data/flash-sale'
  //     }, {
  //       title: '运营商申请',
  //       link: '/pages/data/role'
  //     }
  //   ]
  // },
  // {
  //   title: '应用管理',
  //   icon: 'nb-keypad',
  //   link: '/pages/application',
  //   children: [
  //     {
  //       title: '推送管理',
  //       link: '/pages/application/notify'
  //     },
  //     {
  //       title: '版本管理',
  //       link: '/pages/application/version'
  //     },
  //     {
  //       title: '公告管理',
  //       link: '/pages/application/bulletin'
  //     },
  //     {
  //       title: '邀请海报',
  //       link: '/pages/application/invite-poster'
  //     },
  //   ]
  // },
  // {
  //   title: '商品推广',
  //   icon: 'nb-keypad',
  //   link: '/pages/normal',
  //   children: [
  //     {
  //       title: '朋友圈',
  //       link: groupLink
  //     }
  //   ]
  // },
  {
    title: '菜单',
    icon: 'nb-keypad',
    link: '/pages/others',
    children: [
      {
        title: '订单管理',
        link: '/pages/others/service'
      },
      {
        title: '产品管理',
        link: '/pages/data/banner-setting'
      }
    ]
  },
];

export const MENU_ITEM: NbMenuItem[] = [
  {
    title: '商品推广',
    icon: 'nb-keypad',
    link: '/pages/normal',
    children: [
      // {
      //   title: '朋友圈',
      //   link: groupLink
      // }
    ]
  }
];
