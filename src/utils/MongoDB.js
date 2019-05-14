import mongoose from 'mongoose';

export class MongoDB{
    constructor(){
        this.instance = null;
    }
    static getInstance(){
        if(!this.instance){
            this.instance = mongoose.createConnection('mongodb://bangood:alipay15196634454@ds155076.mlab.com:55076/alipay', { useNewUrlParser: true, useFindAndModify: false });
            this.instance.once('open',function(){
                console.log('hi')
            })
            this.instance.once('close',function(){
                console.log('hiclose')
            })
        }
        return this.instance
    }
    
}

