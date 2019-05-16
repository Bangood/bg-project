import { WebUser } from '../models/webUser.model';
import Jwt from 'jsonwebtoken';
const jwt = {
    secretKey: '#production#Bangood#',
    expires: 60 * 60 * 2
};
async function login($ctx) {
    const { email, password } = $ctx.request.body;
    try {
        const user = await WebUser.findByName(email);
        if (!user) {
            $ctx.throw(423, '该用户不存在');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            $ctx.throw(423, '用户名或密码错误');
        }
        const token = genToken(user);
        $ctx.ok({
            message: '登录成功',
            token: token
        });
    } catch ($err) {
        $ctx.throw($err);
    }
}
async function register($ctx) {
    const { email, password, confirmPassword, fullName } = $ctx.request.body;
    if (email && password && password === confirmPassword) {
        let user = new WebUser({
            userName: fullName,
            email: email,
            password: password
        });
        let result = await user.save();
        if (result) {
            $ctx.ok({ message: '注册成功', token: genToken(result) });
        }
    } else {
        $ctx.ok({ message: '注册失敗' });
    }

}
async function queryUser($ctx) {
    try {
        let user = await checkToken($ctx, true);
        let { userHead, isAdmin, userName, email, _id } = user;
        $ctx.ok({ data: { id: _id, userHead, isAdmin, userName, email } });
    } catch ($err) {
        $ctx.ok({ error: $err.message });
    }
}
async function updateUser($ctx) {
    try {
        let { userHead } = $ctx.request.body;
        await WebUser.findOneAndUpdate({ _id: $ctx.state.user.id }, { userHead: userHead });
        $ctx.ok({ data: null });
    } catch ($err) {
        $ctx.ok({ error: $err.message });
    }
}

function genToken($user) {
    const token = Jwt.sign({
        id: $user._id,
        secret: $user.appSecret,
        userName: $user.userName,
        userHead: $user.userHead,
        pleaseFuckMe: $user.isAdmin
    }, jwt.secretKey, { expiresIn: jwt.expires });

    return token;
}
async function checkToken($ctx, $getUser) {
    const token = $ctx.state.user;
    if (token) {
        const user = await WebUser.findById(token.id);
        if (user) {
            if ($getUser) {
                return user;
            } else {
                return genToken(user);
            }
        } else {
            $ctx.throw(501, 'token信息异常');
        }
    } else {
        $ctx.throw(404, 'token丢失');
    }
}
export { login, register, queryUser, updateUser };