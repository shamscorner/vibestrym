import * as dotenv from 'dotenv'

dotenv.config()

export function isDev() {
	return process.env.NODE_ENV === 'development'
}

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'

export const isAdmin = (email: string): boolean => {
	return email === process.env.ADMIN_EMAIL
}
