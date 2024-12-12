import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@/config/config'
import axios from 'axios'
import { Alert } from 'react-native'

export const apiBase = axios.create({
	baseURL: `${SERVER_URL}/api/v1`,
	withCredentials: true
})

interface ICreateUser {
    name: string
    email: string
    password: string
}
// Create user
// @route POST /api/v1/auth/signup
export const createUser = async (data: ICreateUser) => {
  try {
    const response = await apiBase.post('/auth', data)
    await AsyncStorage.setItem('userToken', response.data.token)
    return response.data
  } catch (err: any) {
    Alert.alert(err.response?.data?.message || 'Failed to create user')
  }
}

interface ILogin {
    email: string
    password: string
}
// Login user
// @route POST /api/v1/auth/login
export const login = async (data: ILogin) => {
  try {
    const response = await apiBase.post('/auth/login', data)
    await AsyncStorage.setItem('userToken', response.data.token)
    return response.data
  } catch (err: any) {
    Alert.alert(err.response?.data?.message || 'Failed to login')
  }
}

// Get user
// @route GET /api/v1/user
export const getUser = async () => {
  try {
    const response = await apiBase.get('/user')
    return response.data
  } catch (err: any) {
    Alert.alert(err.response?.data?.message || 'Failed to get user')
  }
}

// Logout user
// @route POST /api/v1/auth/logout
export const logout = async () => {
  try {
    // Optional: Call backend logout endpoint if needed
    await apiBase.post('/user/logout')

    // Remove token from AsyncStorage
    await AsyncStorage.removeItem('userToken')
  } catch (err: any) {
    Alert.alert(err.response?.data?.message || 'Logout failed')
    throw err
  }
}
