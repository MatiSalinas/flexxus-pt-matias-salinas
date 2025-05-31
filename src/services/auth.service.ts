import { Auth } from "../interfaces/auth.interface";
import { encrypt , verified} from "../utils/bcrypt.handle";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt.handle";
const registerNewUser = async (authUser: Auth) =>{
    const { email, password } = authUser;
    try {
        const emailExists = await UserModel.findUser(email);
        
    if (emailExists) {
        return "EMAIL_ALREADY_EXISTS";
    }
    const hashedPass = await encrypt(password);
    const userCreated = await UserModel.createUser(email, hashedPass);
    if (!userCreated) {
        throw new Error("Error creating user");
    }
    return userCreated;
    } catch (error) {
        throw new Error(`Error in registerNewUser: ${error}`);
    }
    
}

const loginUser = async (authUser: Auth) =>{
try {
    const { email, password } = authUser;
    const user = await UserModel.findUser(email);
    if (!user) {
    return "INCORRECT_EMAIL_OR_PASSWORD";
    }
    const passwordHashed = user.password;
    const isCorrect = await verified(password, passwordHashed);

    if (!isCorrect) {
        return "INCORRECT_EMAIL_OR_PASSWORD";
    }

    if (user.rol_id === undefined) {
        throw new Error("Missing rol_id for user");
      }

    const token = generateToken(user.email, user.rol_id);
    const data = {
        token,
        user
    }
    return data;
} catch (error) {
    throw new Error(`Error in loginUser: ${error}`);
}
}

export { registerNewUser, loginUser };