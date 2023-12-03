import jwt from "jsonwebtoken"
import { environment } from "../main"

/**
 * Creates a signed JWT token
 * @param user The content of the token
 * @returns A signed JWT token
 */
export function generateAccessToken(user: User) {
	return jwt.sign(user, environment.JWT_SECRET, { expiresIn: "32d" })
}

/**
 * Verifies a signed JWT token
 * @param token A signed JWT token
 * @returns The content of the token if it is valid and not expired, throws jwt.JsonWebTokenError otherwise
 */
export function verifyAccessToken(token: string): User {
	return jwt.verify(token, environment.JWT_SECRET) as User
}
