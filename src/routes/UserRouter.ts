import Router from "express";
import UserController from "../controllers/UserController";
const authMiddlewear=require('../middlewears/auth-middlewear')
const router= Router()

router.post('/setUser', authMiddlewear, UserController.create)
router.get('/getUserByLink', UserController.find)

export default router;
