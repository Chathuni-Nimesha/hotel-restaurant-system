import express from "express";
import cors from "cors";

import reservationRoutes from "./routes/reservationRoutes";
import menuRoutes from "./routes/menuRoutes";

const app = express();

const clientOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: clientOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Grand Royal Backend Running");
});

app.use("/api/reservations", reservationRoutes);
app.use("/api/menus", menuRoutes);

export default app;
