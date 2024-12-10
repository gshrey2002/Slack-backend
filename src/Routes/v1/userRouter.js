import express from "express";

const router=express.Router();

router.get('/hello', (req, res) => {  
    return res.status(200).json({ message: 'hello' });
});

export default router;