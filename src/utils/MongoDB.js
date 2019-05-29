import mongoose from 'mongoose';

export class MongoDB{
    constructor(){
        this.instance = null;
    }
    static getInstance(){
        if(!this.instance){
            this.instance = mongoose.createConnection('mongodb://bangood:alipay15196634454@ds155076.mlab.com:55076/alipay', { useNewUrlParser: true, useFindAndModify: false,reconnectTries: Number.MAX_VALUE,reconnectInterval: 500, poolSize: 10,useCreateIndex: true,autoIndex: false});
            this.instance.once('open',function(){
                console.log('数据库已连接')
            })
            this.instance.once('close',function(){
                console.log('数据库已断开')
            })
        }
        return this.instance
    }
    
}

