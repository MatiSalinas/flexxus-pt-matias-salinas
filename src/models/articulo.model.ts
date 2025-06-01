import pool from "../connection/db";
import { Articulo, CreateArticuloDTO } from "../interfaces/articulos.interface";

export class ArticuloModel {

    static async findAll(limit:number,offset: number,nombre?: string, activo?: number): Promise<Articulo[]> {
        try {
            const [rows]: any = await pool.query(
                "CALL sp_get_articulos(?, ?, ?, ?)",
                [nombre ?? null, activo ?? null, limit, offset]
            );
            return rows[0] as Articulo[];
        } catch (error) {
            throw new Error(`Error fetching articles: ${error}`);
        }
    }

    static async findById(id: number): Promise<Articulo | null> {
        try {
            const [rows]: any = await pool.query(
                "CALL sp_get_articulo_by_id(?)",
                [id]
            );
            const articulo = rows[0] as Articulo[];
            return articulo.length > 0 ? articulo[0] : null;
        } catch (error: any) {
            if (error.errno === 1644) {
                return null;
            }
            throw new Error(`Error fetching article by ID: ${error}`);
        }
    }

    static async createArticulo(articulo: CreateArticuloDTO): Promise<Articulo> {
        try {            
            const [rows]: any = await pool.execute(
                "CALL sp_create_articulo(?, ?, ?)",
                [
                    articulo.nombre,
                    articulo.marca,
                    articulo.activo ?? 1
                ]
            );
            return rows[0] as Articulo;
        } catch (error: any) {
            throw new Error(`Error creating article: ${error.message || error}`);
        }
    }

    static async updateArticulo(id: number, articulo: Partial<Articulo>): Promise<Articulo | null> {
        try {
            const [rows]: any =await pool.execute(
                "CALL sp_update_articulo(?, ?, ?, ?)",
                [
                    id,
                    articulo.nombre ?? null,
                    articulo.marca ?? null,
                    articulo.activo ?? null
                ]
            );
            return rows[0] as Articulo;
        } catch (error: any) {
            if (error.errno === 1644) {
                return null;
            }
            throw new Error(`Error updating article: ${error}`);
        }
    }

    static async deleteArticulo(id: number): Promise<boolean> {
        try {
            await pool.query(
                "CALL sp_delete_articulo(?)",
                [id]
            );
            return true;
        } catch (error: any) {
            if (error.errno === 1644) {
                return false;
            }
            throw new Error(`Error deleting article: ${error}`);
        }
    }
}