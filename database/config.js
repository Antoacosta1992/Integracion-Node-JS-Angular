const {mongoose} = require ('mongoose');

const dbConnection = async () => {
	mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true }, (err, res) => {
		if (err) throw err;

		console.log('DB ONLINE');
	});
};

module.exports = {
dbConnection
}

