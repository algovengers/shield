import { Router } from "express";
import { createSos } from "../controllers/sos.controller";
import { getUsers } from "../controllers/user.controller";
import { getNotifications } from "../controllers/notification.controller";
import { accpetFavRequest, addFavNonUser, createFavRequest, declineFavRequest } from "../controllers/fav.controller";

const authRouter = Router()

authRouter.route('/hii').get(createSos)

// for searching
authRouter.route('/getUsers').get(getUsers)

// on creatint a fav user existing in our platfrom
authRouter.route('/createFavUser').post()

// for creating a fav user not existing in our platform
authRouter.route("/createNonFavUser").post(addFavNonUser)


authRouter.route('/getNotifications').get(getNotifications)

// fav request
authRouter.route('/createFavRequest').post(createFavRequest)
authRouter.route('/acceptFavRequest').post(accpetFavRequest)
authRouter.route('/declineFavRequest').post(declineFavRequest)




export {authRouter}