import type { NextFunction, Request, Response } from 'express'
import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import { verifyJwtToken } from '../utils/utils'

interface IServerResponse {
    status: 'success' | 'error'
    message: string
    data: any
}

// Helper function to extract bearer token from Authorization header
const extractBearerToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer') return null;

  return token;
};

export const userAuth = async (
  req: Request,
  res: Response<IServerResponse>,
  next: NextFunction,
) => {
  try {
    // Extract bearer token from Authorization header
    const token = extractBearerToken(req.headers.authorization);

    if (!token) {
      return res.status(HttpStatusCode.Unauthorized).json({
        status: 'error',
        message: 'Please provide a valid Bearer token!',
        data: null,
      })
    }

    let decoded = verifyJwtToken(token);

    if (decoded.status === 'error') {
      return res.status(HttpStatusCode.Unauthorized).json({
        status: 'error',
        message: 'Unauthorized',
        data: null,
      })
    }

    // Set user id
    res.locals.user = decoded.data.token;
    next();
  } catch (err) {
    Logger.error({ message: 'Error Authenticating user: ' + err })
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error Authenticating User',
      data: null,
    })
  }
}

