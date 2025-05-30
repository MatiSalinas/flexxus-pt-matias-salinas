import pool from "../connection/db";
import { Auth } from "../interfaces/auth.interface";

export class UserModel {
    static async findUser(email:string) : Promise<Auth | null>{
        try {
            const sql = "SELECT email, password FROM usuarios WHERE email = ?;"
            const [rows] = await pool.query(sql, [email]);
            const usuario = (rows as Auth[]);
            return usuario.length > 0 ? usuario[0] : null;
            }
         catch (error) {
            throw new Error(`Error finding email: ${error}`);
        }
    }

    static async createUser(email: string, password: string): Promise<boolean> {
        const sql = "INSERT INTO usuarios (email, password, rol_id) VALUES (?, ?, 1);";
        try {
            const [result]: any = await pool.query(sql, [email, password]);
            return result.affectedRows > 0;
        } catch (error: any) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
}