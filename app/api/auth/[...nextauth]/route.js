import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/db'
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})],
	callbacks: {
		async signIn({ user, profile }) {
			let auth = false

			const registeredUser = await prisma.user.findUnique({
				where: {
					email: user.email
				}
			})

			if (registeredUser) {
				if (registeredUser.authorized_bitch_user) {
					auth = !auth
					return auth
				}
				return '/auth/unauthorized'
			}
			const role = await prisma.role.findUnique({
				where: {
					name: 'asset user'
				},
				select: {
					id: true
				}
			})

			const registeringUser = {
				id: uuidv4(),
				fn: profile.given_name,
				ln: profile.family_name,
				full_name: profile.name,
				email: profile.email,
				authorized_bitch_user: 0,
				role_id: role.id
			}
			const newUser = await prisma.user.create({ data: registeringUser })
			return '/auth/registered'
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
	},
	pages: {
		newUser: '/auth/register'
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };