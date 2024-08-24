import { loginAdmin, logoutAdmin, registerAdmin } from "controllers/admin.controller";
import { Router } from "express";
import { authenticateAdmin } from "middleware/auth";

const adminRouter = Router()

adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/create').post(authenticateAdmin,registerAdmin)
adminRouter.route('/logout').post(authenticateAdmin,logoutAdmin)
// adminRouter.route('/dashboard').post()

export {adminRouter}