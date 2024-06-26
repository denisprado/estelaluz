import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	// experimental: {
	// 	reactCompiler: false
	// },
	async redirects() {
		return [
			// Basic redirect
			{
				source: '/adquira',
				destination: '/adquira/todos',
				permanent: true,
			},
		]
	},
	images: {

		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.amazonaws.com',
				port: '',
				pathname: "/estelaluz/**",
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: "/**",
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/**',
			},
		],
	},
}

export default withPayload(nextConfig)