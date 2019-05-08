import { sendMail } from '../utils/email';
async function getNotify($ctx) {
    console.log('获得一条get notify======');
    console.log($ctx.request)
}

/**
 * 
 * { operation_id: '20190508678435411502',
  auth_no: '2019050810002001150278073409',
  sign_type: 'RSA2',
  payee_user_id: '2088431978724276',
  out_order_no: 'CP190402133400000211oon1557307796056',
  auth_app_id: '2019042364291281',
  notify_type: 'fund_auth_freeze',
  payer_user_id: '2088102932328154',
  version: '1.0',
  amount: '0.01',
  rest_amount: '0.01',
  notify_time: '2019-05-08 17:30:02',
  status: 'SUCCESS',
  charset: 'utf-8',
  operation_type: 'FREEZE',
  total_unfreeze_amount: '0.00',
  sign:
   'HRI1nvPKwTkp7ObzvHSKsZUl8wIqc5v0ZhuHH7jXurpIjIVLjMKjXbpsVZeJJrRAcB9Ve4a5Y/iTl/u9yGjC41ioeVrBPJ7qaSCxwoGqhLAcUjnuwP22EGo4uqM4bCi5HtX6Sg6kTeivfI8GHu8ihj8V8oZ9HKNZs/lz+yclbmBIFGsp4uPVr9Qe5dMJ95SyOQAo4rpfy7zFiSCN24TMHndUjvtuXoulIxVSf5EaqrTkzkprjT9T0rxHdxWmlyafHRiGUgeul+uEOklIY1YxSD4rUqPmocXjDD27fquK/mFXzaEnjhWs9WtGO3mwnLzSA154BfBS8aTK0ge4rwIM5g==',
  payee_logon_id: '396***@qq.com',
  gmt_create: '2019-05-08 17:29:56',
  total_freeze_amount: '0.01',
  payer_logon_id: 'wan***@126.com',
  out_request_no: 'CP190402133400000211orn1557307796056',
  app_id: '2019042364291281',
  total_pay_amount: '0.00',
  notify_id: '2019050800222173002059101025382688',
  gmt_trans: '2019-05-08 17:30:02' }

 */
async function postNotify($ctx) {
    console.log('获得一条post notify======');
    console.log($ctx.request.body)
    let result = await global.alipaySdk.checkNotifySign($ctx.request.body);
    console.log(result);
    const { out_order_no, total_freeze_amount, total_pay_amount, out_request_no, status,operation_id,auth_no } = $ctx.request.body;
    if (status === 'SUCCESS'&&global.userInfoMap.has(out_order_no)) {
        let { pid, userName, userTelphone, userEmail, province, area, county, address } = global.userInfoMap.get(out_order_no);
        global.userInfoMap.delete(out_order_no);
        console.log(global.userInfoMap);
        sendMail({
            pid,
            userName,
            userTelphone,
            userEmail,
            province,
            area,
            county,
            address,
            outOrderNo: out_order_no,
            totalFreezeAmount: total_freeze_amount,
            totalPayAmount: total_pay_amount,
            outRequestNo: out_request_no,
            outOrderNo: out_order_no,
            operationId: operation_id,
            authNo:auth_no,
        });
    }
    $ctx.ok('success');
}
export { getNotify, postNotify };