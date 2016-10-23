var express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		Gym = require('./models/gym'),
		app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gyms');

var port = process.env.PORT || 8080;

var router = express.Router();

//middleware to use for all routes
router.use(function(req, res, next) {
	console.log('something is happening');
	//next is important, app would stop here without it
	next();
});

//test route to make sure it is working
router.get('/', function(req, res) {
	res.json({ message: 'Hooray! Welcome to your API!' });
});

router.route('/gyms')
.post(function (req, res) {
		var gym = new Gym();
		gym.name = req.body.name;
		gym.save(function(err) {
			if(err) 
				res.send(err);
			res.json({ message: 'Gym created!'});
		});
	})
	.get(function(req, res) {
			Gym.find(function(err, gyms) {
				if (err) {
					res.send(err);
				}
				res.json(gyms);
				console.log(gyms);
			});
	
	
	});

router.route('/gyms/:gym_id')
	.get(function(req, res) {
		Gym.findById(req.params.gym_id, function(err, gym) {
			if (err) {
				res.send(err);
			}
			res.json(gym);
		});
	})
	.put(function(req, res) {
		Gym.findById(req.params.gym_id, function(err, gym) {
			if (err) {
				res.send(err);
			}
			gym.name = req.body.name;

			gym.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Gym updated', name: req.body.name});
			});
		});
	})
	.delete(function(req, res) {
		Gym.remove({
			_id: req.params.gym_id
		}, function(err, gym) {
			if (err) {
				res.send(err);
			}
			res.json({message: 'Gym deleted'});
		});
	});




//all routes will be prefixed with api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ', port);
