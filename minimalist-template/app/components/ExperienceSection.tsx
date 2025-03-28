const ExperienceSection = () => {
	const experiences = [
		{
			role: 'Senior Software Engineer',
			company: 'Tech Corp',
			period: '2020 - Present',
			highlights: 'Led development of microservices architecture, 40% improvement in system performance',
		},
		{
			role: 'Software Engineer',
			company: 'Innovation Labs',
			period: '2017 - 2020',
			highlights: 'Architected cloud-native applications, mentored junior developers',
		},
		{
			role: 'Full Stack Developer',
			company: 'StartUp Inc',
			period: '2015 - 2017',
			highlights: 'Built scalable web applications using React and Node.js',
		},
	];

	return (
		<div className="py-6 bg-white dark:bg-gray-900 px-6">
			<div className="space-y-4 max-w-2xl mx-auto">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center md:text-left">Experience</h3>
					<div className="h-px w-full bg-gray-200 dark:bg-gray-700 mt-2" />
				</div>

				<div className="space-y-5">
					{experiences.map((exp) => (
						<div key={exp.company} className="relative">
							<div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
								<div className="absolute -left-[5px] top-[10px] h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />

								<div className="space-y-1">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between">
										<h4 className="text-md font-medium text-gray-900 dark:text-white">{exp.role}</h4>
										<span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
									</div>
									<p className="text-sm font-medium text-gray-600 dark:text-gray-300">{exp.company}</p>
									<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{exp.highlights}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExperienceSection;
