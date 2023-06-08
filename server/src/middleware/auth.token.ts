import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.header.authorization.split('\"')[1]
    } catch (error) {
        res.status(401).send({error,err:"Authentication failed"})
    }
}