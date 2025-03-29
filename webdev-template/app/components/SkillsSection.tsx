import React from 'react';

export const SkillsSection = () => {
	return (
		<section className="py-12 sm:py-20 px-4 bg-[#161B22]">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-16 text-center">Technical Expertise</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
					{[
						{
							category: 'Game Development',
							skills: [
								{ name: 'Unity (C#)', level: 90 },
								{ name: 'Shaders (GLSL/HLSL)', level: 85 },
								{ name: 'Unreal Engine (BluePrints & C++)', level: 70 },
								{ name: 'Game Design & UX', level: 88 },
							],
							icon: '🎮',
							color: 'from-pink-500 to-pink-700',
						},
						{
							category: 'Creative Coding & Graphics',
							skills: [
								{ name: 'WebGL & Three.js', level: 85 },
								{ name: 'GLSL/HLSL', level: 95 },
								{ name: 'Procedural Art', level: 70 },
								{ name: 'Real-time Rendering', level: 88 },
							],
							icon: '✨',
							color: 'from-yellow-500 to-yellow-700',
						},
						{
							category: 'Frontend & Interactive UI',
							skills: [
								{ name: 'HTML, CSS, JavaScript', level: 92 },
								{ name: 'React & Next.js', level: 88 },
								{ name: 'Web Animation (GSAP)', level: 80 },
								{ name: 'WebGPU / WebXR', level: 76 },
							],
							icon: '🖥️',
							color: 'from-indigo-500 to-indigo-700',
						},
					].map((category) => (
						<div key={category.category} className="bg-[#21262D] rounded-lg p-6 transform hover:scale-[1.02] transition-all">
							<div className="flex items-center gap-3 mb-6">
								<span className="text-3xl">{category.icon}</span>
								<h3 className="text-xl font-bold">{category.category}</h3>
							</div>
							<div className="space-y-4">
								{category.skills.map((skill) => (
									<div key={skill.name}>
										<div className="flex justify-between text-sm mb-1">
											<span>{skill.name}</span>
											<span className="text-gray-400">{skill.level}%</span>
										</div>
										<div className="h-2 bg-[#30363D] rounded-full overflow-hidden">
											<div className={`h-full bg-gradient-to-r ${category.color} animate-expand origin-left`} style={{ width: `${skill.level}%` }}></div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
