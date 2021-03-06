import alipaySDK from 'alipay-sdk';
import crypto from 'crypto';
import {
    appID,
    merchantPrivateKey,
    merchantPublicKey,
    alipayPublicKey
} from '../config/alipay.config';
const ALIPAY_ALGORITHM_MAPPING = {
    RSA: 'RSA-SHA1',
    RSA2: 'RSA-SHA256',
};
export class AlipaySDK {
    constructor() {
        this.instance = null;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new alipaySDK({
                appId: appID,
                privateKey: merchantPrivateKey,
                alipayPublicKey: alipayPublicKey
            });
            //为网关验签
            this.instance.checkNotifySignForGateway = function(postData) {
                const signStr = postData.sign;
                const signType = postData.sign_type || 'RSA2';
                if (!this.config.alipayPublicKey || !signStr) {
                    return false;
                }
                const signArgs = Object.assign({}, postData);
                // 除去sign、sign_type 皆是待验签的参数。
                delete signArgs.sign;
                const decodeSign = Object.keys(signArgs).sort().filter(val => val).map((key) => {
                    let value = signArgs[key];
                    if (Array.prototype.toString.call(value) !== '[object String]') {
                        value = JSON.stringify(value);
                    }
                    return `${key}=${decodeURIComponent(value)}`;
                }).join('&');
                const verifier = crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[signType]);
                verifier.update(decodeSign, 'utf8');
                return verifier.verify(this.config.alipayPublicKey, signStr, 'base64');
            };
            //为网关签名
            this.instance.signForGateway = function(){
                return crypto.createSign('RSA-SHA256').update(`<biz_content>${merchantPublicKey}</biz_content><success>true</success>`, 'utf8').sign(this.config.privateKey, 'base64');
            }
            return this.instance;
        }
        return this.instance;
    }
}
