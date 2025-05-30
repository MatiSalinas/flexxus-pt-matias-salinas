import { Router } from "express"
import { getArticulos, getArticulo, postArticulo, deleteArticulo,putArticulo } from "../../controllers/articulo.controller";

const articuloRouter = Router()

articuloRouter.get("/", getArticulos);
articuloRouter.get("/:id", getArticulo);
articuloRouter.post("/", postArticulo);
articuloRouter.put("/:id", putArticulo);
articuloRouter.delete("/:id",deleteArticulo);

export default articuloRouter;