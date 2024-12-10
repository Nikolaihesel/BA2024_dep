const mongoose = require('mongoose');
const Machine = require('./infrastructure/database/models/MachineModel');

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Update all machines missing the connectedAt field
		const result = await Machine.updateMany(
			{ connectedAt: { $exists: false } }, // Find machines where connectedAt does not exist
			{ $set: { connectedAt: new Date() } } // Set connectedAt to the current date and time
		);

		console.log(`Updated ${result.modifiedCount} machines`);

		// Close the database connection
		mongoose.connection.close();
	} catch (error) {
		console.error('Error updating machines:', error);
		process.exit(1); // Exit with error code
	}
})();
