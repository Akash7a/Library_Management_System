import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

const authenticatedAdmin = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request." });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const admin = await Admin.findById(decoded._id);

        if (!admin) {
            return res.status(401).json({ message: "Uauthorized request." });
        }
        
        req.admin = admin;

        next();

    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired token" });
    }
}