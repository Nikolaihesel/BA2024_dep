class FetchAllUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute() {
		return await this.userRepository.fetchAll();
	}
}

module.exports = FetchAllUsers;
