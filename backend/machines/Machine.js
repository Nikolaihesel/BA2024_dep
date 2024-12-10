class Machine {
	constructor(id, name, socket) {
		this.id = id;
		this.name = name;
		this.socket = socket;
		this.state = 'stopped';
		this.value = 0;
	}

	start() {
		if (this.state === 'stopped') {
			this.state = 'running';
			this.socket.emit('start', { id: this.id, state: this.state });
			return `${this.name} is now running`;
		}
		return `${this.name} is already running`;
	}

	stop() {
		if (this.state !== 'stopped') {
			this.state = 'stopped';
			this.socket.emit('stop', { id: this.id, state: this.state });
			return `${this.name} has been stopped`;
		}
		return `${this.name} is already stopped`;
	}

	adjustValue(newValue) {
		this.value = newValue;
		this.socket.emit('adjust', { id: this.id, value: this.value });
		return `${this.name} value adjusted to ${this.value}`;
	}

	getState() {
		return {
			id: this.id,
			name: this.name,
			state: this.state,
			value: this.value,
		};
	}
}

module.exports = Machine;
