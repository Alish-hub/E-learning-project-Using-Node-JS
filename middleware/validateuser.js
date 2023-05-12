import { check,body } from "express-validator";
export const validRegister=[
    body('password').default(undefined),
    body('email').default(undefined),
    body('name').default(undefined),


    check('name','name is required')
    .isLength({
        min:3,
        max:32
    })
    .withMessage('name must be between 4 to 32 characters'),


    check('email','Enter valid email')
    .notEmpty()
    .isEmail()
    .withMessage('must be a valid email address'),


    check('password','Enter a valid password')
    .isLength({min:6})
    .matches(/(?=.*?[0-9])/)
    .withMessage('password must contain 6 letter with a character and a number')
      
    
]