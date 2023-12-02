import express from "express";
import { createListing, deleteListings, updateListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListings);
router.delete('/delete/:id', verifyToken, deleteListings)

export default router;
