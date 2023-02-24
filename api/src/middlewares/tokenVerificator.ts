import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";
import { ForbiddenError, UnauthorizedError } from "../helpers/apiError";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = (<string>authHeader).split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) throw new ForbiddenError()
      else {
        req.user = decoded
        next()
      }
    })
  } else {
    throw new UnauthorizedError('You are not authorized!')
  }
}

export const verifyUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = (<string>authHeader).split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) throw new ForbiddenError()
      else {
        req.user = decoded
        if(decoded.role == 'admin' || decoded.id == req.params.id) next()
        else {
          throw new ForbiddenError('Access is denied! You must be an administrator to change user data.')
        }
      }
    })
  } else {
    throw new UnauthorizedError('You are not authorized!')
  }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = (<string>authHeader).split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) throw new ForbiddenError()
      else {
        req.user = decoded
        if(decoded.role == 'admin') next()
        else {
          throw new ForbiddenError('You are not allowed to do that!')
        }
      }
    })
  } else {
    throw new UnauthorizedError('You are not authorized!')
  }
}