const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ce8a0c8b9de94b8ca2700905cfab2ffc'
});

const handleApiCall = () => (req, res) => {
	app.models
	.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
	.then((data) => {
		res.json(data);
	})
	.catch((error) => res.status(400).json('unable to work with api'))
}


const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then((entries) => {
		res.json(entries[0]);
	})
	.catch((error) => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}