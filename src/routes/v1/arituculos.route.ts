import { Router } from "express"

const articuloRouter = Router()

articuloRouter.get("/");
articuloRouter.post("/");
articuloRouter.put("/:id");
articuloRouter.delete("/:id");

export default articuloRouter;