import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/db'

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
			const { role: { name: role } } = await prisma.user.findUnique({
				where: {
					email: token.email
				},
				select: {
					role: {
						select: {
							name: true
						}
					}
				}
			})

			if (role) {
				token.role = role
			}
			return token
		},
		async session({ session, token }) {
			session.user.role = token.role
			return session
		}
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };