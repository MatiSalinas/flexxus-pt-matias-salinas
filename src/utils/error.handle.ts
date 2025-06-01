import { Response } from "express";

const handleHttpError = (res: Response, error:string,errorRaw: any) => {
    console.log(errorRaw);
    res.status(500).send({error:error, message:errorRaw.message})
}

export {handleHttpError};