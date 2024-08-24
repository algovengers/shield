import { Router } from "express";
import { createSos } from "../controllers/sos.controller";

const authRouter = Router()

// authRouter.route('/hii').get()
authRouter.route('/createSos').post(createSos);


export {authRouter}