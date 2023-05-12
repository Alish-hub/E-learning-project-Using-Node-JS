import { Router } from "express";
import { validRegister } from "../middleware/validateuser.js";
import { forgetPassword, getAll, getById, login, register, resetPassword, update } from "../controllers/user-controllers.js";
import { isUser } from "../middleware/isUser.js";
import { isUserValidate } from "../middleware/joi-isUser.js";

const router = Router();



router.post('/register',isUserValidate, register);
router.post('/login',login);
router.get('/getAll',isUser,getAll);
router.get('/getById/:id',getById);
router.put('/getByIdAndUpdate/:id',update);


router.post('/forgetPassword', forgetPassword);
router.put('/reset/:token', resetPassword);

export default router;