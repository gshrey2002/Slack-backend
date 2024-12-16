import express from "express";

import { signUpController } from "../../Controller/userController.js";
import { validate } from "../../Validator/zodValidator.js";
import { userSchemaValidator } from "../../Validator/userSchemaValidator.js";

const router=express.Router();

router.get('/hello', (req, res) => {  
    return res.status(200).json({ message: 'hello' });
});

router.post('/signup', validate(userSchemaValidator),signUpController)

export default router;