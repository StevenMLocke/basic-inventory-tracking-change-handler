import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/db'
import { redirect } from "next/navigation";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})],
	callbacks: {
		async signIn({ user }) {
			let auth = false

			const { authorized_bitch_user } = await prisma.user.findUnique({
				where: {
					email: user.email
				}
			})

			if (authorized_bitch_user) {
				auth = !auth
			}
			return auth
		},
		async jwt({ token }) {
			token.role = null
			const { role: { name: role }, id, fn, ln } = await prisma.user.findUnique({
				where: {
					email: token.email
				},
				select: {
					role: {
						select: {
							name: true
						}
					},
					id: true,
					fn: true,
					ln: true,
				}
			})

			if (role) {
				token.role = role
			}
			if (id) {
				token.user_id = id
			}
			if (fn) {
				token.user_name = `${fn} ${ln}`
			}
			return token
		},
		async session({ session, token }) {
			let expires = null
			if (token) {
				expires = new Date(token.exp * 1000)
				session.user.role = token.role
				session.user.id = token.user_id
				session.user.name = token.user_name
				session.tokenExpiration = expires
				return session
			}
			redirect('/api/auth/[...nextauth]/signin/')
		}
	},
	jwt: {
		maxAge: 60 * 60 * 8,
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };