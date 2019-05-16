import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import  Crypto from 'crypto';
import {MongoDB} from '../utils/MongoDB';
const saltRounds = 10;
const WebUserSchema = new mongoose.Schema({
    userName: String,
    userHead: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    appSecret: {
        type: String,
        default: GetHmac()
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });
function GetHmac() {
    const hmac = Crypto.createHmac('sha256', '5201314');
    hmac.update(Date.now().toString());
    return hmac.digest('hex');
}

WebUserSchema.pre('save', async function($next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return $next();
        }
        const salt = await Bcrypt.genSalt(saltRounds);
        const hash = await Bcrypt.hash(this.password, salt);
        user.password = hash;
        return $next();
    } catch ($err) {
        return $next($err);
    }
});

WebUserSchema.methods.comparePassword = async function($password) {
    const isMatch = await Bcrypt.compare($password, this.password);
    return isMatch;
};

WebUserSchema.statics.findByName = async function($email) {
    const user = await this.findOne({
        email: $email
    });
    return user;
};

WebUserSchema.statics.checkToken = async function($token) {
    const secret = GetHmac();
    const user = await this.findOneAndUpdate({ _id: $token.id }, { appSecret: secret });
    if ($token.secret === user.appSecret) {
        user.appSecret = secret;
        return user;
    } else {
        throw new Error('token验证未通过!');
    }
};

export const WebUser = MongoDB.getInstance().model('WebUser', WebUserSchema);