import pool from "../connection/db";
import { Articulo, CreateArticuloDTO } from "../interfaces/articulos.interface";
export class ArticuloModel{

    static async findAll(nombre?: string, activo?: number): Promise<Articulo[]>{
        try {
            let sql = "SELECT id_articulos, nombre, marca, activo, fecha_modificacion FROM articulos WHERE 1=1";
            const values: any[] = [];
            if (nombre) {
                sql += " AND nombre LIKE ?";
                values.push(`%${nombre}%`);
            }

            if (activo !== undefined) {
                sql += " AND activo = ?";
                values.push(activo);
            }
            const [rows] = await pool.query(sql, values);
            return rows as Articulo[];
        } catch (error) {
            throw new Error(`Error fetching articles: ${error}`);
        }
    }

    static async findById(id: number): Promise<Articulo | null> {
        try {
            const sql = "SELECT id_articulos, nombre, marca, activo, fecha_modificacion FROM articulos WHERE id_articulos = ?;";
            const [rows] = await pool.query(sql, [id]);
            const articulo = (rows as Articulo[]);
            return articulo.length > 0 ? articulo[0] : null;
        } catch (error) {
            throw new Error(`Error fetching article by ID: ${error}`);
        }
    }
    static async createArticulo(articulo: CreateArticuloDTO): Promise<boolean> {
        const sql = "INSERT INTO articulos (nombre, marca, activo) VALUES (?, ?, ?);";
        try {
            const [result] = await pool.query(sql, [
                articulo.nombre, 
                articulo.marca, 
                articulo.activo ?? true 
            ]);
            return (result as any).affectedRows > 0;
        } catch (error: any) {
            throw new Error(`Error creating article: ${error}`);
        }
    }
    static async updateArticulo(id: number, articulo: Partial<Articulo>): Promise<boolean> {
        try {
            const entries = Object.entries(articulo).filter(([key]) => key !== 'id');
            if (entries.length === 0) return false;
            const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = entries.map(([, value]) => value);
            const sql = `UPDATE articulos SET ${setClause} WHERE id_articulos = ?`;
            const [result] = await pool.query(sql, [...values, id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error(`Error updating article: ${error}`);
        }
        
    }

    static async deleteArticulo(id: number): Promise<boolean> {
        try {
            const sql = "UPDATE articulos SET activo = 0 WHERE id_articulos = ?;";
            const [result] = await pool.query(sql, [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting article: ${error}`);
        }
    }
}