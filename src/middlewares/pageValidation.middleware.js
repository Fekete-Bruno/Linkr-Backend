function validatePage(req,res,next){
    let page = Number(req.params.page);
    if(Number.isNaN(page)){
        page = 1;
    }
    res.locals.page = page;
    next();
}

export default validatePage;