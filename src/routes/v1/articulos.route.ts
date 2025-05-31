import { Router } from "express"
import { getArticulos, getArticulo, postArticulo, deleteArticulo,putArticulo } from "../../controllers/articulo.controller";
import { validateBody, validateQuery } from "../../middlewares/zod.validate";
import { articleQuerySchema, createArticuloSchema } from "../../validations/articulo.schema";
import { checkJWT, checkRole } from "../../middlewares/session";

const articuloRouter = Router()

articuloRouter.get("/",checkJWT,validateQuery(articleQuerySchema) ,getArticulos);
articuloRouter.get("/:id",checkJWT ,getArticulo);
articuloRouter.post("/",checkJWT,checkRole([2]),validateBody(createArticuloSchema) ,postArticulo);
articuloRouter.put("/:id",checkJWT,checkRole([2]) ,putArticulo);
articuloRouter.delete("/:id",checkJWT,checkRole([2]),deleteArticulo);

export default articuloRouter;