class CreateRoomUseCase {
	constructor(roomRepository) {
		this.roomRepository = roomRepository;
	}

	async execute(roomData) {
		return await this.roomRepository.create(roomData);
	}
}

module.exports = CreateRoomUseCase;
