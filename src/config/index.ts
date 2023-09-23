import { config } from 'dotenv'

config();

export const PORT = process.env.PORT || 5000
export const IS_DEV = process.env.NODE_ENV === 'development'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || ''
