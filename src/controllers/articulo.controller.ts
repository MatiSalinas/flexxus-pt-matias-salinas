import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle";
import { ArticuloModel } from "../models/articulo.model";
import { Articulo, CreateArticuloDTO } from "../interfaces/articulos.interface";
import { articleSchema, createArticuloSchema } from '../validations/articulo.schema';

const getArticulos = async (req: Request, res: Response) => {
    try {
        const nombre = req.query.nombre as string | undefined;
        const activo = req.query.isActivo as number | undefined;

        const articulos = await ArticuloModel.findAll(nombre, activo);

        res.status(200).send({
            success: true,
            data: articulos,
            message: `${articulos.length} articles found`
        });
        return;
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ARTICULOS",error);
    }
}

const getArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articulo = await ArticuloModel.findById(Number(id));
        if (articulo) {
            res.status(200).send({
                success: true,
                data: articulo
            });
            return;
        }
        res.status(404).send({message: "Article not found", success: false});
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ARTICULO",error);
    }
}
const postArticulo = async (req: Request, res: Response) => {
    try {
        const ArticuloData : CreateArticuloDTO = req.body;
        const response = await ArticuloModel.createArticulo(ArticuloData);
        if (response){
            res.status(201).send({
                message: "Article created successfully",
                success: true,
                data: response

            });
            return;
        }
        res.status(400).send({message: "Error creating article.", success: false});
    } catch (error) {
        handleHttpError(res, "ERROR_POST_ARTICULO",error);
    }
}
const putArticulo = async (req: Request, res: Response) => {
    try {
        const ArticuloData : Partial<Articulo> = req.body;
        const { id } = req.params;
        const response = await ArticuloModel.updateArticulo(Number(id), ArticuloData);
        if (response) {
            res.status(200).send({
                message: "Article updated successfully",
                success: true,
                data: response

            });
            return;
        }
        res.status(400).send({message: "Error updating article", success: false});
    } catch (error) {
        handleHttpError(res, "ERROR_PUT_ARTICULO",error);
    }
}
const deleteArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await ArticuloModel.deleteArticulo(Number(id));
        if (response) {
            res.status(200).send({
                message: "Article deleted successfully",
                success: true
            });
            return;
        }
        res.status(400).send({message: "Error deleting article", success: false});
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ARTICULO",error);
    }
}

export { getArticulos,getArticulo, postArticulo, putArticulo, deleteArticulo };