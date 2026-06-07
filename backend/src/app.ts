import express from "express";
import cors from "cors";

import reservationRoutes from "./routes/reservationRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Grand Royal Backend Running");
});

app.use("/api/reservations", reservationRoutes);


export default app;