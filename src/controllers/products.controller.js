import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
const privateKey = 'MIIEpAIBAAKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQABAoIBAD76u4Vk9jS+BlZ4URMmaUxaFxAaG39NSLBk6EL1GV7Ue8CpFp0ByA5z+C97w2YohqQEYKjYj3rtnET+gFuYk8FbeeZvRe1VPsMWrUsdkIF+JXi9pfiFieNWSmoOgD8TCy2ZgZj/kWb9AxiWUIEUESzVdluIICRkbfIMn6wZys/Eclzhry6crf8a4xFrt4OjO0fvXOLN/OhGwI0MmtVpg3Xgu14M4hAVOaIU4po/9tB+1aOuVgI4k/cAPk++8vV5VImn9DBxOuAi1lMmlhYfJ5jCefxrAtUmPIuB+caPKmEnMwcBGkC0MRVH4eUsG1Ws9d7lHEo3fyK/YkFIHNivCIkCgYEA9fybPanXFEVIA9986X3hofsU148+htA55H9hpVLh3SDS87J5YZBvNmbN+PMKqL4nbXkD52hGsqMVKg/vJEz41KrAxlazRUextYRkFh6lsudgWd97KgXyJGEm2RTAVVRdLviKm/u6vJXVSxk/moKlSBxuK0W+O04TZGrTnZeDnvsCgYEA04nRjyHqXL2ytKEZUKs4K84hRgpPi0hHzRmaqNwiV4ELVRKoMSqMT1JNK9VTfCzhtDfCggQb1Wl0StC5Tixavc99XY9YCIX8qRdxyy6uBxdCMnOTXTA9owexxvKS+AsC4FzlxtaKy3Qv74WU+eXEdcf0lT198K8mMgTjLS6bzDsCgYBTI0s8rhh5S2kplfFb4SXPX1MN/+X8HohSiBLyk26vFBb4Mov/w5cy5dAbodkqawpcX5hIL+AlJCVVEAmdVT6MciGxZ0Az3CVd2h8Rss4CB11zQqsX6uaKESPWHsNak6bi5zHBwnS8pE9wkFoE2L8P/jvl+C5xUNQRDmHzU3Ay3QKBgQCBxBqsrkaBq9ETo3vPE6m6nZGl0K9pJub894b7rUbX3Q6hmndY6dv20OsMR6oWE8ZFcqs8bN7SNQWk25PBU846gC1MlqGPYPpUlFA3LySMrwTpxCKTWQOGnjK9c5Ma3E5gajx+lJ/CHT1GtvBjuEKjag0s+/LlEdzhdEQUNHJYfwKBgQCVH3OTQDtfzhFb2g8yw3hDhZopIaPI8dbNKkp7fQxJlAZAVuVS4cb4Lj0lV7i6orRtCL+HsrNH8kCEhXHOTx05wPNbRBKKhsI7z2XLWbNtzScRRCEk6WERRefQIKbFXe+wlqnUf7an3PxwWeCyxHi4I2w8n80Wh5AxA51XAc4naA==';
const alipayPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiULinfbmmNmsPiiBaNGTKl8abplmt62WBhmJ8l4b4eK0FM7TbLETBAzUgXY1OG9PjQBXyaADNzhdR1exU15NTSpnCWlqcQGZFzZ6Kt39p/dWU5+ZmObG1cX3ShN0qzVcbPxKBYlZvPsrbiBUZdTEOInF822ftcl4cp8OK0kdoHz5xYo/Vc6Ek2re85WeYja4zM/Y9ysyH7+ZdrgtLNs5iA+JJW1jTVwqfctc/lq4N7KmHA6WezIX2E9KZiOSbF8UnYk3ZerggaHoKvkRxHFIqqyHk8JT5Me+39ad1DSFS5J16Grq9S0ZjHcVYXN3z0NXHqRP5QMLe9pDxPk17dU+xQIDAQAB';
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB';
const alipaySdk = new AlipaySdk({
    appId: '2019042364291281',
    privateKey: privateKey,
    alipayPublicKey: alipayPublicKey,
});
async function list($ctx) {
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
    $ctx.ok({ status: 0, data: { key: 0, msg: products } });
}
async function renderPage($ctx) {
    await $ctx.render('products/list', {
        "status": 0,
        "data": {
            "key": 0,
            "msg": {
                "pageHeaderImg": "/imgs/klcs.jpg",
                "productName": "考拉超收",
                "noticeInfo": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品"
            }
        }
    });
}
async function renderItem($ctx) {
    await $ctx.render('products/product', {});
}
async function getAuthUrl($ctx) {
    let redirectUrl = encodeURI('http://39.100.71.78/v1/alipay/redirect/' + $ctx.query.id);
    $ctx.ok({ status: 0, data: { key: 0, msg: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri=' + redirectUrl } })
}
async function getProduct($ctx) {
    $ctx.ok({
        "status": 0,
        "data": {
            "key": 0,
            "msg": {
                "pageHeaderImg": "/imgs/klcs.jpg",
                "productName": "考拉超收",
                "noticeInfo": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品"
            }
        }
    })
}
async function saveOrder($ctx) {
    let { openId, productId, userName, UserTelphone, userEmail, province, area, country, address, isWithhold } = JSON.parse($ctx.request.body.param)
    try {
        const formData = new AlipayFormData();
        formData.setMethod('get');
        formData.addField('bizContent',{
            outOrderNo: '8077735255938023',
                outRequestNo: '8077735255938032',
                orderTitle: '预授权冻结',
                amount: 0.01,
                productCode: 'PRE_AUTH_ONLINE',
                payeeLogonId: '396493396@qq.com'
        })
        let result = await alipaySdk.exec('alipay.fund.auth.order.app.freeze',{},{formData:formData})

        const result1 = result.split('https://openapi.alipay.com/gateway.do?');
        const result2 = result1.slice(1);
        console.log(result2);
        $ctx.ok({
            "status": 0,
            "data": {
                "key": 0,
                "msg": {
                    body: result2[0]
                }
            }
        })
    } catch (err) {
        $ctx.ok({
            "status": 1,
            "data": {
                "key": 1,
                "msg": JSON.stringify(err)
            }
        })
        console.log(err);
    }
    
}
export { list, renderPage, renderItem, getAuthUrl, getProduct, saveOrder };