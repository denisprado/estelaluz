import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	// experimental: {
	// 	reactCompiler: false
	// },
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: 'estelaluz.vercel.app',
	// 			port: '',
	// 			pathname: '/**',
	// 		},
	// 		{
	// 			protocol: 'http',
	// 			hostname: 'localhost',
	// 			port: '3000',
	// 			pathname: '/**',
	// 		},
	// 	],
	// },
}

export default withPayload(nextConfig)