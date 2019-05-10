import alipaySDK from 'alipay-sdk';
import {
    appID,
    merchantPrivateKey,
    merchantPublicKey,
    alipayPublicKey
} from '../config/alipay.config';
export class AlipaySDK {
    constructor() {
        this.instance = null;
        console.log('hi')
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new alipaySDK({
                appId:appID,
                privateKey: merchantPrivateKey,
                alipayPublicKey:alipayPublicKey
            });
            return this.instance;
        }
        return this.instance;
    }
}
