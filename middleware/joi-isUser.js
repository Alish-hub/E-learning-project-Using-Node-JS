import Joi from "joi";
export const isUserValidate = async(req,res,next)=>{

    const User = Joi.object().keys({
        name: Joi.string().min(3).max(15).required(),
        email: Joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().alphanum().regex(/^[a-zA-Z0-9]{3,30}$/),
        section: Joi.string().valid('A', 'B', 'C'),
        usertype: Joi.string()
        // array().items(Joi.string()
        
        
    });
    // console.log(req.body)
    User.validateAsync(req.body)
    .then(()=>next())
    .catch((err)=> res.status(400).json({err:err.message}))
    // if(result!=null) return res.status(400).json({err:'User not validate'})
    // next();
    


}