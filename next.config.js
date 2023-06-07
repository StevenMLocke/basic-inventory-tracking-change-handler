/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				port: '',
				pathname: "/**"
			},
		],
	},
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client']
	},
}

module.exports = nextConfig
