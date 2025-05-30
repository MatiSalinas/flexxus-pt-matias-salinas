import pool from "../connection/db";

export class UserModel {
    static async findEmail(email:string) : Promise<boolean>{
        try {
            const sql = "SELECT email FROM users WHERE email = ?;"
            const [rows] : any = await pool.query(sql, [email]) ;
            return rows.length > 0;
            }
         catch (error) {
            throw new Error(`Error finding email: ${error}`);
        }
    }

    static async createUser(email: string, password: string): Promise<boolean> {
        const sql = "INSERT INTO usuarios (email, password, id_rol) VALUES (?, ?, 1);";
        try {
            const [result]: any = await pool.query(sql, [email, password]);
            return result.affectedRows > 0;
        } catch (error: any) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
}