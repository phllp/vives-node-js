import express from "express";
import routes from "./routes/routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(routes);
app.use("/auth", authRoutes);

export default app;
