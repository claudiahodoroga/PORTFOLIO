import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Claudia Rebeca Hodoroga - Creative Coder & Game Developer',
	description:
		'Portfolio of Claudia Rebeca Hodoroga, a creative coder, frontend developer, and game artist. Specializing in interactive experiences, real-time graphics, and game development with Unity, Unreal, and modern web technologies.',
	keywords: [
		'Creative Coder',
		'Game Developer',
		'Frontend Developer',
		'Technical Artist',
		'WebGL',
		'Unity Developer',
		'Unreal Engine',
		'Sshaders',
		'GLSL',
		'HLSL',
		'C++',
		'C#',
		'Python',
		'HTML',
		'CSS',
		'JavaScript',
		'Three.js',
		'Game Design',
		'UX/UI',
		'3D Art',
		'Blender',
		'Interactive Media',
		'Real-time Rendering',
		'Graphics Programming',
		'Claudia Rebeca Hodoroga'
	],
	authors: [{ name: 'Claudia Rebeca Hodoroga' }],
	creator: 'Claudia Rebeca Hodoroga',
	openGraph: {
		title: 'Claudia Rebeca Hodoroga - Creative Coder & Game Developer',
		description: 'Explore my work in game development, creative coding, and frontend web experiences. From shaders to interactive storytelling, I bring ideas to life through code and art.',
		url: 'https://your-domain.com',
		siteName: 'Claudia Rebeca Hodoroga - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Claudia Rebeca Hodoroga - Creative Coder & Game Developer',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
