import { Auth } from "../interfaces/auth.interface";
import { encrypt } from "../utils/bcrypt.handle";
import { UserModel } from "../models/user.model";
const registerNewUser = async (authUser: Auth) =>{
    const { email, password } = authUser;
    try {
        const emailExists = await UserModel.findEmail(email);
    if (emailExists) {
        throw new Error("Email already exists");
    }
    const hashedPass = await encrypt(password);
    const userCreated = await UserModel.createUser(email, hashedPass);
    if (!userCreated) {
        throw new Error("Error creating user");
    }
    } catch (error) {
        
    }
    
}

const loginUser = async () =>{

}

export { registerNewUser, loginUser };