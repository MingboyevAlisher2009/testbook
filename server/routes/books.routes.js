import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/books.controller.js";

const router = Router();

router.get("/", AuthMiddleware, getBooks);
router.post("/", AuthMiddleware, createBook);
router.put("/:id", AuthMiddleware, updateBook);
router.delete("/:id", AuthMiddleware, deleteBook);

export default router;
