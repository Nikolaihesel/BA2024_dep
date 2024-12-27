class CreateDepartment {
	constructor(departmentRepository) {
		this.departmentRepository = departmentRepository;
	}

	async execute(departmentData) {
		return await this.departmentRepository.create(departmentData);
	}
}

module.exports = CreateDepartment;
