import { Router } from "express";
import {authenticateAdmin} from "../middleware/verifyJWT.js";

import{
    registerAdmin,
    loginAdmin,
    addStudent,
}
from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/addNewStudent").post(authenticateAdmin,addStudent);

export {
    adminRouter
}