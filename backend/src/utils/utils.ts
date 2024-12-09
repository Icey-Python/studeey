import jwt from 'jsonwebtoken'
import { config } from '../config/config'

type PayloadType = {
	payload: string
	expiresIn: number | '1h' | '1d' | '7d' | '14d' | '30d' | number
}

type ResultType = {
	status: 'success' | 'error'
	message: string
	data: any
}



// Sign JWT token
export const signJwtToken = (payload: PayloadType): ResultType => {
	try {
		let result = jwt.sign({ token: payload.payload }, config.JWT_SECRET, {
			expiresIn: payload.expiresIn
		})

		return {
			status: 'success',
			message: 'Token created successfully',
			data: { token: result }
		}
	} catch (error) {
		return {
			status: 'error',
			message: 'Token could not be created',
			data: null
		}
	}
}

// Verify JWT token
export const verifyJwtToken = (token: string): ResultType => {
	try {
		let result = jwt.verify(token, config.JWT_SECRET)
		return {
			status: 'success',
			message: 'Token verified successfully',
			data: result
		}
	} catch (error) {
		return {
			status: 'error',
			message: 'Token could not be verified',
			data: null
		}
	}
}
