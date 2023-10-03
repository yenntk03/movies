import express from "express";
import { protect, admin } from "../middlewares/auth.js";
import * as moviesController from "../Controllers/MoviesController.js";

const router = express.Router();

//***** PUBLIC ROUTES *****
router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMoviesById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

// ****** PRIVATE ROUTE ******
router.post("/:id/reviews", protect, moviesController.createMovieReview);
// ****** ADMIN ROUTES ******
router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovies);
router.post("/", protect, admin, moviesController.createMovie);

export default router;