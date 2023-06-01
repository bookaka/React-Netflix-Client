import express from 'express';
import {
    createUser,
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies,
} from '../controllers/user.js'

const router = express.Router();


router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.post("/create/:email", createUser);

export default router; 