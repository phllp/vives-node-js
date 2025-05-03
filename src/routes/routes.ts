import { Router } from "express";

const routes = Router();

routes.get("/health", (_, res) => {
  res.send({ message: "Up'n running" });
});

export default routes;
