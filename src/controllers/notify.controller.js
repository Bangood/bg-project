async function getNotify($ctx) {
   console.log('获得一条get notify======');
   console.log($ctx.request)
}
async function postNotify($ctx) {
    console.log('获得一条post notify======');
    console.log($ctx.request.body)
}
export { getNotify,postNotify };