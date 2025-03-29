import React from 'react';

export const WebCapabilitiesSection = () => {
	return (
		<section className="py-12 sm:py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Skills in Action</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{[
						{
							title: 'Game Development',
							icon: '🎮',
							features: ['Unity (C#)', 'Puzzle & Level Design', 'Storytelling Mechanics'],
						},
						{
							title: 'Procedural Graphics',
							icon: '🌌',
							features: ['WebGL & GLSL', 'Shader Optimization', 'App-like experience'],
						},
						{
							title: 'Concept Art & Design',
							icon: '🖌️',
							features: ['Character & Environment Art', 'Digital Painting', '3D Modelling'],
						},
						{
							title: 'Frontend Development',
							icon: '💻',
							features: ['React & Next.js', 'CSS Animations', 'Responsive UI'],
						},
						{
							title: 'Performance Optimization',
							icon: '🚀',
							features: ['Efficient Rendering', 'Memory Management', 'Code Optimization'],
						},
						{
							title: 'Creative Coding',
							icon: '✨',
							features: ['Generative Art', 'Interactive Experiences', 'WebGL Animations'],
						},
					].map((category) => (
						<div key={category.title} className="group bg-[#161B22] p-6 rounded-lg hover:bg-[#21262D] transition-all">
							<div className="text-3xl mb-4">{category.icon}</div>
							<h3 className="text-xl font-bold mb-3">{category.title}</h3>
							<ul className="space-y-2">
								{category.features.map((feature) => (
									<li key={feature} className="text-gray-400 group-hover:text-gray-300 transition-colors">
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
