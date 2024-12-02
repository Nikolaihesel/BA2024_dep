const JwtService = require('../services/jwtService');

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'No token provided' });
	}

	const token = authHeader.split(' ')[1];
	const jwtService = new JwtService(process.env.JWT_SECRET);

	try {
		const decoded = jwtService.verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Invalid or expired token' });
	}
};

module.exports = authMiddleware;
