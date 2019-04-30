async function list($ctx){
    $ctx.body('hi');
}
async function renderPage($ctx){
    await $ctx.render('products/list',{});
}
export {list,renderPage};