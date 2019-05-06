async function list($ctx){
    let products = [{
        "id": "CP190402133400000211",
        "productName": "考拉超收",
        "isNaturalMonth": 1,
        "productDesc": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品",
        "creditAmount": 298,
        "deductions": 299.0,
        "logoImg": "/imgs/klcs.jpg",
        "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
        "isOnline": 1,
        "checkTimeLength": 10,
        "ramark": null,
        "createTime": "2019-04-02 13:34:28",
        "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
        "withholdUrl": null,
        "hostUrl": "http://apply.epicbm.cn"
    }]
    $ctx.ok({status:0,data:{key:0,msg:products}});
}
async function renderPage($ctx){
    await $ctx.render('products/list',{});
}
async function renderItem($ctx){
    await $ctx.render('products/product',{});
}
async function getAuthUrl($ctx){
    let redirectUrl = encodeURI('http://39.100.71.78/v1/alipay/redirect');
    $ctx.ok({status:0,data:{key:0,msg:'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri='+redirectUrl}})
}
export {list,renderPage,renderItem,getAuthUrl};