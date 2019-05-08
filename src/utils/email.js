import nodemailer from 'nodemailer';
let transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '2117704062@qq.com',
        pass: 'jyysohtzprdudiig'
    }
});

function sendMail({ userName, userTelphone, province, area, county, address,pid }) {
    transporter.sendMail({
        from: '2117704062@qq.com', // sender address
        to: "2419281635@qq.com,287215760@qq.com", // list of receivers
        subject: "生活号-商品申请", // Subject line

        html: `
        <div>
            <h3>姓名:</h3>
            <span>${userName}</span>
        </div>
        <div>
            <h3>手机号码:</h3>
            <span>${userTelphone}</span>
        </div>
        <div>
            <h3>所在省份:</h3>
            <span>${province}</span>
        </div>
        <div>
            <h3>所在地市:</h3>
            <span>${area}</span>
        </div>
        <div>
            <h3>所在区县:</h3>
            <span>${county}</span>
        </div>
        <div>
            <h3>街道地址:</h3>
            <span>${address}</span>
        </div>
        <div>
            <h3>申请的产品:</h3>
            <span>${pid}</span>
        </div>
        `
    })
}
export { sendMail };