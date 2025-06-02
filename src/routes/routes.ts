import { Router } from "express";

const routes = Router();

routes.get("/health", (_, res) => {
  res.send({ message: "Up'n running" });
});

routes.get("/", (_, res) => {
  res.send({ message: "it is an api" });
});

export default routes;
