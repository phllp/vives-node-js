import express from "express";
import routes from "./routes/routes";
import authRoutes from "./routes/auth.routes";
import donationRoutes from "./routes/donations.routes";
import requestRoutes from "./routes/help-request.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();
app.use(express.json());
app.use(routes);
app.use("/auth", authRoutes);
app.use("/donations", donationRoutes);
app.use("/help-requests", requestRoutes);

app.use(errorHandler);

export default app;
