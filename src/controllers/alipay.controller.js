import AlipaySdk from 'alipay-sdk';
const privateKey = 'MIIEpAIBAAKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQABAoIBAD76u4Vk9jS+BlZ4URMmaUxaFxAaG39NSLBk6EL1GV7Ue8CpFp0ByA5z+C97w2YohqQEYKjYj3rtnET+gFuYk8FbeeZvRe1VPsMWrUsdkIF+JXi9pfiFieNWSmoOgD8TCy2ZgZj/kWb9AxiWUIEUESzVdluIICRkbfIMn6wZys/Eclzhry6crf8a4xFrt4OjO0fvXOLN/OhGwI0MmtVpg3Xgu14M4hAVOaIU4po/9tB+1aOuVgI4k/cAPk++8vV5VImn9DBxOuAi1lMmlhYfJ5jCefxrAtUmPIuB+caPKmEnMwcBGkC0MRVH4eUsG1Ws9d7lHEo3fyK/YkFIHNivCIkCgYEA9fybPanXFEVIA9986X3hofsU148+htA55H9hpVLh3SDS87J5YZBvNmbN+PMKqL4nbXkD52hGsqMVKg/vJEz41KrAxlazRUextYRkFh6lsudgWd97KgXyJGEm2RTAVVRdLviKm/u6vJXVSxk/moKlSBxuK0W+O04TZGrTnZeDnvsCgYEA04nRjyHqXL2ytKEZUKs4K84hRgpPi0hHzRmaqNwiV4ELVRKoMSqMT1JNK9VTfCzhtDfCggQb1Wl0StC5Tixavc99XY9YCIX8qRdxyy6uBxdCMnOTXTA9owexxvKS+AsC4FzlxtaKy3Qv74WU+eXEdcf0lT198K8mMgTjLS6bzDsCgYBTI0s8rhh5S2kplfFb4SXPX1MN/+X8HohSiBLyk26vFBb4Mov/w5cy5dAbodkqawpcX5hIL+AlJCVVEAmdVT6MciGxZ0Az3CVd2h8Rss4CB11zQqsX6uaKESPWHsNak6bi5zHBwnS8pE9wkFoE2L8P/jvl+C5xUNQRDmHzU3Ay3QKBgQCBxBqsrkaBq9ETo3vPE6m6nZGl0K9pJub894b7rUbX3Q6hmndY6dv20OsMR6oWE8ZFcqs8bN7SNQWk25PBU846gC1MlqGPYPpUlFA3LySMrwTpxCKTWQOGnjK9c5Ma3E5gajx+lJ/CHT1GtvBjuEKjag0s+/LlEdzhdEQUNHJYfwKBgQCVH3OTQDtfzhFb2g8yw3hDhZopIaPI8dbNKkp7fQxJlAZAVuVS4cb4Lj0lV7i6orRtCL+HsrNH8kCEhXHOTx05wPNbRBKKhsI7z2XLWbNtzScRRCEk6WERRefQIKbFXe+wlqnUf7an3PxwWeCyxHi4I2w8n80Wh5AxA51XAc4naA==';
const alipayPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiULinfbmmNmsPiiBaNGTKl8abplmt62WBhmJ8l4b4eK0FM7TbLETBAzUgXY1OG9PjQBXyaADNzhdR1exU15NTSpnCWlqcQGZFzZ6Kt39p/dWU5+ZmObG1cX3ShN0qzVcbPxKBYlZvPsrbiBUZdTEOInF822ftcl4cp8OK0kdoHz5xYo/Vc6Ek2re85WeYja4zM/Y9ysyH7+ZdrgtLNs5iA+JJW1jTVwqfctc/lq4N7KmHA6WezIX2E9KZiOSbF8UnYk3ZerggaHoKvkRxHFIqqyHk8JT5Me+39ad1DSFS5J16Grq9S0ZjHcVYXN3z0NXHqRP5QMLe9pDxPk17dU+xQIDAQAB';
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB';
const alipaySdk = new AlipaySdk({
    appId: '2019042364291281',
    privateKey: privateKey,
    alipayPublicKey: alipayPublicKey,
});

// 格式化 key
function formatKey(key, type) {
    const item = key.split('\n').map(val => val.trim());
    console.log(item)
        // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的第一行
    if (item[0].includes(type)) {
        item.shift();
    }
    // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的最后一行
    if (item[item.length - 1].includes(type)) {
        item.pop();
    }
    return `-----BEGIN ${type}-----\n${item.join('')}\n-----END ${type}-----`;
}
async function fundAuthOrderAppFreeze() {
    try {
        const result = await alipaySdk.exec('alipay.fund.auth.order.app.freeze', {
            bizContent: {
                outOrderNo: '8077735255938023',
                outRequestNo: '8077735255938032',
                orderTitle: '预授权冻结',
                amount: 0.01,
                productCode: 'PRE_AUTH_ONLINE',
                payeeLogonId: '15196634454',
                payeeUserId: '2088102000275795',
                payTimeout: '2d',
                extraParam: '{\"category\":\"CHARGE_PILE_CAR\"}',
                sceneCode: 'OVERSEAS_ONLINE_AUTH_COMMON_SCENE',
                transCurrency: 'USD',
                settleCurrency: 'USD',
                enablePayChannels: '[{\"payChannelType\":\"PCREDIT_PAY\"},{\"payChannelType\":\"MONEY_FUND\"}]'
            }
        }, {
            validateSign: true,
            log: console,
        });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
async function redirect($ctx) {
    let { app_id, source, scope, auth_code } = $ctx.query;
    try {
        let result = await alipaySdk.exec('alipay.system.oauth.token', {
            grantType: 'authorization_code',
            code: auth_code,
        }, {
            validateSign: true,
            log: console
        });
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}
export { fundAuthOrderAppFreeze, redirect };