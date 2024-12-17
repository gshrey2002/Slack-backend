import express from "express";

import { signInController, signUpController } from "../../Controller/userController.js";
import { userSchemaValidator,userSignInValidator } from "../../Validator/userSchemaValidator.js";
import { validate } from "../../Validator/zodValidator.js";

const router=express.Router();

router.get('/hello', (req, res) => {  
    return res.status(200).json({ message: 'hello' });
});

router.post('/signup', validate(userSchemaValidator),signUpController)
router.post('/signin',validate(userSignInValidator),signInController)

export default router;