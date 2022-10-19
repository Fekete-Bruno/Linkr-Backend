import postSchema from "../schemas/post.schema.js";

function validatePost (req,res,next){
    let {url,description} = req.body;
    const validation = postSchema.validate({url,description},{abortEarly:false});
    if(validation.error){
        const errors = validation.error.details.map(error => error.message);
        return res.status(422).send({ message: errors });
    }
    if(description===undefined){
        description='';
    }
    console.log(description)
    res.locals.url=url;
    res.locals.description=description;

    next();
}

export default validatePost;