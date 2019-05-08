async function getNotify($ctx) {
   console.log('获得一条get notify======');
   console.log($ctx.requset)
}
async function postNotify($ctx) {
    console.log('获得一条post notify======');
    console.log($ctx.requset)
}
export { getNotify,postNotify };