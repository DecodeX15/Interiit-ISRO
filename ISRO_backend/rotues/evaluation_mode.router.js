import { Router } from "express";
import { Evaluation_response_handler } from "../Controller/evaluation_response_handler.js"; // agar kahin aur hai

const evaluation_router = Router();

evaluation_router.route("/evaluation").post(Evaluation_response_handler);

export { evaluation_router};
