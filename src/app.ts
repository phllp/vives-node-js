import express from "express";
import routes from "./routes/routes";
import authRoutes from "./routes/auth.routes";
import donationRoutes from "./routes/donations.routes";

const app = express();
app.use(express.json());
app.use(routes);
app.use("/auth", authRoutes);
app.use("/donations", donationRoutes);

export default app;
