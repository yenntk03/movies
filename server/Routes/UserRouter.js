import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovies,
  deleteLikedMovies,
  getUsers,
  deleteUser,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

//***** PUBLIC ROUTES *****
router.post("/", registerUser);
router.post("/login", loginUser);

// ****** PRIVATE ROUTE ******
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovies);
router.delete("/favorites", protect, deleteLikedMovies);
export default router;

// ****** ADMIN ROUTES ******
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);
