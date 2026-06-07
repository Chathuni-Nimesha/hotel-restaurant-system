import express from "express";
import {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation,
} from "../controllers/reservationController";

const router = express.Router();

router.get("/", getReservations);
router.put("/:id", updateReservation);
router.delete("/test", (req, res) => {
  res.json({
    success: true,
    message: "DELETE working",
  });
});
router.delete("/:id", deleteReservation);
router.post("/", createReservation);

export default router;