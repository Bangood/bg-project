import mongoose from 'mongoose';

export class MongoDB{
    constructor(){
        this.instance = null;
    }
    static getInstance(){
        if(!this.instance){
            this.instance = mongoose.createConnection('mongodb://bangood:alipay15196634454@ds155076.mlab.com:55076/alipay', { useNewUrlParser: true });
            this.instance.once('open',function(){
                console.log('hi')
            })
        }
        return this.instance
    }
    
}
let a = MongoDB.getInstance();
setTimeout(()=>{
    const OrderSchema = new mongoose.Schema({
        userName:String,
        userTelphone:String
    }, { versionKey: false });
    console.log(OrderSchema)
    const OrderModel = mongoose.model('Orders', OrderSchema);
    OrderModel.create({userName: 'inserting ' + Date.now()}, function(err, doc) {
        console.log('b')
        if (err)console.log(err);
        console.log(doc)
      });
},3000)
