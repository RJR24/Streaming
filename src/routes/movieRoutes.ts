import express from "express";
import {
  createMovie,
  updateMovie,
  getMovies,
  deleteMovie,
} from "../controllers/MovieController";

const router = express.Router();

// Define movie routes
router.post("/create", createMovie);
router.put("/update/:movieId", updateMovie);
router.get("/list", getMovies);
router.delete("/delete/:movieId", deleteMovie);

export default router;
