import express from "express";

import {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
} from "../controllers/menuController";

const router = express.Router();

router.get("/", getMenus);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;