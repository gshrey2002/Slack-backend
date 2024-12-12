import express from "express";

import { signUpController } from "../../Controller/userController.js";

const router=express.Router();

router.get('/hello', (req, res) => {  
    return res.status(200).json({ message: 'hello' });
});

router.post('/signup', signUpController)

export default router;