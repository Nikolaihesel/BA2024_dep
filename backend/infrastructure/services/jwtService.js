const jwt = require('jsonwebtoken');

class JwtService {
	constructor(secret, expiresIn = '1h') {
		this.secret = secret;
		this.expiresIn = expiresIn;
	}

	generateToken(payload) {
		return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
	}

	verifyToken(token) {
		try {
			return jwt.verify(token, this.secret);
		} catch (error) {
			throw new Error('Invalid or expired token');
		}
	}
}

module.exports = JwtService;
