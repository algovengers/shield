import { Router } from "express";
import { createSos } from "./sos.controller";

const authRouter = Router()

authRouter.route('/hii').get(createSos)


export {authRouter}