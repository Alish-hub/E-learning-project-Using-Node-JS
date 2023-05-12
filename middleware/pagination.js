// export const paginateResult = (model)=>{
//     return(req,res,next)=>{
//         const  page = parseInt  (req.query.page);
//         const limit= parseInt(req.query.limit);
//         const startIndex = (page-1)*limit;
//         const endIndex = page*limit;
//         const results ={};
//         results.result = model.slice(startIndex,endIndex);
//         res.results= results;
//         next();
//     }
// }

import user from "../models/User.js";

 
export const paginateResult = async(req,res,next)=>{
    const user1= await user.find()

    const  page = parseInt(req.query.page);
    const limit= parseInt(req.query.limit);
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    const results ={};
    results.result = user1.slice(startIndex,endIndex);
    res.results= results;
    next();

} 