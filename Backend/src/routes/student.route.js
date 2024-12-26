import { Router } from "express";
import { authenticateAdmin } from "../middleware/verifyJWT.js"
import {
    getStudents,
    addStudent,
    deleteStudent,
}
    from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.route("/getStudents").get(authenticateAdmin, getStudents);
studentRouter.route("/addNewStudent").post(authenticateAdmin, addStudent);
studentRouter.route("/:studentId").delete(authenticateAdmin, deleteStudent);

export {
    studentRouter
}