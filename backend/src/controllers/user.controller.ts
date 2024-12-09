import bcrypt from 'bcrypt'
import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'
import User from '../models/user.model'
import { signJwtToken } from '../utils/utils'
import { IServerResponse } from '../types'


// Create a user
// @route POST /api/v1/user
export const create = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if user exists
    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Account already exists. Please login!',
        data: null,
      })
    }

    let hashedPassword = await bcrypt.hash(password, 10)

    let user = new User({
      name,
      email,
      password: hashedPassword,
    })

    if (!user) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error creating user',
        data: null,
      })
    }

    let signedToken = signJwtToken({
      payload: user.id,
      expiresIn: '7d',
    })

    if (signedToken.status === 'error') {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error signing token',
        data: null,
      })
    }

    return res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Account created successfully',
      data:{
        token: signedToken.data.token,
        user: user
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error creating user' + err })
    return res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error creating user',
      data: null,
    })
  }
}

// Login a user
// @route POST /api/v1/user/login
export const login = async (req: Request, res: Response<IServerResponse>) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Please enter all fields',
        data: null,
      })
    }

    // Check if user exists
    let user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }

    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      })
    }

    let signedToken = signJwtToken({
      payload: user.id,
      expiresIn: '7d',
    })

    if (signedToken.status === 'error') {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        message: 'Error signing token',
        data: null,
      })
    }

    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        token: signedToken.data,
        user: user,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error logging in user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error logging in user',
      data: null,
    })
  }
}
