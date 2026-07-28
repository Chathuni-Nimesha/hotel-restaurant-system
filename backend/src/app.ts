import express from "express";
import cors from "cors";

import reservationRoutes from "./routes/reservationRoutes";
import menuRoutes from "./routes/menuRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Grand Royal Backend Running");
});

app.use("/api/reservations", reservationRoutes);
app.use("/api/menus", menuRoutes);


export default app;