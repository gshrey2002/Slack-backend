import express from "express";

import { createWorkspaceController } from "../../Controller/workSpaceController.js";
import {isAuthenticated} from "../../middleware/authMiddleware.js"
import { workspaceSchemaValidator } from "../../Validator/workspaceSchemaValidator.js";
import { validate } from "../../Validator/zodValidator.js";

const router=express.Router();

router.post('/hello', (req, res) => {  
    return res.status(200).json({ message: 'hello' });
});

router.post('/createWorkspace',isAuthenticated,validate(workspaceSchemaValidator),createWorkspaceController)

export default router;