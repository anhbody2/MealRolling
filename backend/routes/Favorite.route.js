import express from "express";

import {
    getFavorites,
    addFavorite,
    removeFavorite,
    checkFavorite
} from "../controllers/Favourite.controller.js";

const router = express.Router();

router.get(
    "/:userId/favorites",
    getFavorites
);

router.get(
    "/:userId/favorites/:productId",
    checkFavorite
);

router.post(
    "/:userId/favorites/:productId",
    addFavorite
);

router.delete(
    "/:userId/favorites/:productId",
    removeFavorite
);

export default router;