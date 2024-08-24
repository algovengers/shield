import { loginAdmin, logoutAdmin, registerAdmin } from "controllers/admin.controller";
import { getSos } from "controllers/sos.controller";
import { Router } from "express";
import { authenticateAdmin } from "middleware/auth";

const adminRouter = Router()

adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/create').post(registerAdmin)
adminRouter.route('/logout').post(logoutAdmin)
adminRouter.route('/getsos').post(getSos)
// adminRouter.route('/dashboard').post()

export {adminRouter}