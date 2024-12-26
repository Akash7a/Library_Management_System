import { Router } from "express";
import {authenticateAdmin} from "../middleware/verifyJWT.js";

import{
    registerAdmin,
    loginAdmin,
    addStudent,
    adminLogout,
    adminProfile,
    getStudents,
}
from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/addNewStudent").post(authenticateAdmin,addStudent);
adminRouter.route("/logout").get(authenticateAdmin,adminLogout);
adminRouter.route("/getProfile").get(authenticateAdmin,adminProfile);
adminRouter.route("/getStudents").get(authenticateAdmin,getStudents);

export {
    adminRouter
}