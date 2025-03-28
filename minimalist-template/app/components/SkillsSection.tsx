const SkillsSection = () => {
	const skills = [
		{
			category: 'Languages',
			items: ['TypeScript', 'Python', 'Go'],
			icon: (
				<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#9DA2AF" strokeWidth="2">
					<path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3M3 16v3a2 2 0 002 2h3m8-2h3a2 2 0 002-2v-3" />
				</svg>
			),
		},
		{
			category: 'Backend',
			items: ['Node.js', 'PostgreSQL', 'Redis'],
			icon: (
				<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#9DA2AF" strokeWidth="2">
					<path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
				</svg>
			),
		},
		{
			category: 'Cloud',
			items: ['AWS', 'Kubernetes', 'Docker'],
			icon: (
				<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#9DA2AF" strokeWidth="2">
					<path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
				</svg>
			),
		},
	];

	return (
		<div className="py-6 bg-white dark:bg-gray-900 px-6">
			<div className="space-y-4 max-w-2xl mx-auto">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center md:text-left">Core Skills</h3>
					<div className="h-px w-full bg-gray-200 dark:bg-gray-700 mt-2" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{skills.map((skillGroup) => (
						<div key={skillGroup.category}>
							<div className="flex items-center space-x-2 mb-2">
								{skillGroup.icon}
								<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{skillGroup.category}</h4>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{skillGroup.items.map((skill) => (
									<span
										key={skill}
										className="px-2.5 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SkillsSection;
