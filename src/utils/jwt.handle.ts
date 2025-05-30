import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (email: string, id_rol: number) =>{
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const jsonwebtoken = jwt.sign({email,id_rol}, JWT_SECRET,{
    expiresIn: "2h"
});
return jsonwebtoken;
}
const verifyToken = (jwtParam: string) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const isOk = jwt.verify(jwtParam, JWT_SECRET ) 
    return isOk;

}

export {generateToken, verifyToken};