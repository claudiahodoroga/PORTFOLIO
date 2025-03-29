import React from 'react';
import Image from 'next/image';

export const ProjectsSection = () => {
	return (
		<section id="work" className="py-12 sm:py-20 px-4 bg-[#161B22] scroll-mt-20">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Featured Projects</h2>
				<div className="space-y-8 sm:space-y-12">
					{[
						{
							title: 'Guardian of The Breadth',
							description: 'A first-person 3D puzzle game where players navigate and escape-room-like environment while uncovering a deep narrative. Built in Unity, worked in a team of 4 as Project Manager and Technical Artist.',
							metrics: ['Puzzles'],
							techDetails: ['Unity (C#)', 'Custom Shaders (HLSL & ShaderGraph)', '3D Modelling', 'Story-driver level design'],
							image: '/code.jpg',
							link: 'https://guardian-of-the-breadth.itch.io/game',
						},
						{
							title: 'WebGL Galaxy Generator',
							description: 'A WebGL-based galaxy generator that creates a randomized starry sky with a planet, using procedural techniques.',
							metrics: ['Procedural'],
							techDetails: ['WebGl', 'GLSL', 'Randomixed Planet Generation', 'Optimized Rendering'],
							image: '/code.jpg',
							link: 'https://u1988492.github.io/p1_infografica/',
						},
						{
							title: 'Concept Art & Digital Drawings',
							description: 'A collection of my concept art and illustrations, developed for various class projects and personal work.',
							metrics: ['Creativity', 'Technical Skills', 'Software'],
							techDetails: ['Clip Studio Paint', 'Character Design', 'SketchBook', 'Digital Painting'],
							image: '/code.jpg',
							link: 'https://u1988492.github.io/p1_infografica/',
						},
					].map((project) => (
						<div key={project.title} className="bg-[#21262D] rounded-lg overflow-hidden">
							<div className="grid grid-cols-1 lg:grid-cols-2">
								<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
									<h3 className="text-xl sm:text-2xl font-bold">{project.title}</h3>
									<p className="text-sm sm:text-base text-gray-400">{project.description}</p>

									{/* Performance Metrics */}
									<div className="space-y-3">
										<h4 className="text-base sm:text-lg font-semibold">Key Highlights</h4>
										<div className="grid grid-cols-3 gap-2 sm:gap-4">
											{Object.entries(project.metrics).map(([key]) => (
												<div key={key} className="text-center">
													<div className="text-2xl font-bold text-pink-400">{key}</div>
												</div>
											))}
										</div>
									</div>

									{/* Technical Implementation */}
									<div>
										<h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Technical Implementation</h4>
										<ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
											{project.techDetails.map((detail) => (
												<li key={detail} className="flex items-center gap-2">
													<span className="text-pink-400">▹</span>
													<span className="text-gray-300">{detail}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
								{/* Project Link */}
								{project.link && (
									<div className='mt-4'>
										<a
											href={project.link}
											target='_blank'
											rel="noopener noreferrer"
											className='inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all'
										>
											View Live Project →
										</a>
									</div>
								)}

								<div className="relative h-full min-h-[300px] lg:min-h-full">
									<Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
									<div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#21262D] via-transparent to-transparent lg:via-[#21262D]/20 lg:to-[#21262D]/40"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
