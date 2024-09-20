'use client'
import axios from 'axios'

const APIPATH = process.env.NEXT_PUBLIC_API_URL
// const APIPATH = process.env.NEXT_PUBLIC_API_URL_LOCAL
const SIGNUP = process.env.NEXT_PUBLIC_API_URL_REGISTER_USER

export const api = axios.create({
    baseURL: APIPATH,
})

export const preSignUp = async (email: string, password: string, name: string, birthday: string, occupation: string, timezone: string) => {
  const response = await api.post(`${SIGNUP}`, { email, password, name, birthday, occupation, timezone })
    console.log(response.data)
    return response.data
}