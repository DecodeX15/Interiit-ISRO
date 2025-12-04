import { Router } from "express";
import { Interactive_response_handler } from "../Controller/Interactive_response_handler.js"; // agar kahin aur hai

const interactive_router = Router();

interactive_router.route("/interactive_analysis").post(Interactive_response_handler);

export { interactive_router };
