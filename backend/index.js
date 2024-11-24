const express = require('express');
require('dotenv').config(); // Load environment variables
const connectDB = require('./infrastructure/database/mongoose');
const app = express();

connectDB();
app.use(express.json());

const routes = require('./interfaces/http/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
