/* eslint-disable no-undef */

const router = require('./src/router');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expectCt = require('expect-ct');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

const mongoose = require('mongoose');
mongoose.connect(url, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 90000
});

const db = mongoose.connection;
db.once('open', () => {
	console.log('Connected to MongoDB');
});

const sessionSecret = process.env.SESSION_SECRET;
const sessionID = 'sessionID';
const store = new MongoDBStore({
	uri: url,
	collection: 'sessions'
});

app.use(session({
	name: sessionID,
	secret: sessionSecret,
	store: store,
	resave: false,
	saveUninitialized: false,
	cookie: {
		sameSite: true,
		secure: false
	}
}));


app.use(
	helmet(),
	helmet.contentSecurityPolicy({
		directives: {
			'default-src': ['\'self\'', 'https://api.openweathermap.org'],
			'script-src': ['\'self\'', 'https://kit.fontawesome.com', 'https://kit-free.fontawesome.com'],
			'style-src': ['\'self\'',
				'\'unsafe-inline\'',
				'https://fonts.googleapis.com',
				'http://fonts.googleapis.com',
				'https://kit-free.fontawesome.com'
			],
			'font-src': ['\'self\'', 'https://fonts.gstatic.com', 'https://kit-free.fontawesome.com', 'http://fonts.gstatic.com', 'http://kit-free.fontawesome.com',],
			'img-src': ['\'self\'', '*.cloudinary.com'],
		}
	}),
	helmet.frameguard({ action: 'deny' }),
	helmet.permittedCrossDomainPolicies()
);
app.use(expectCt({
	maxAge: 43200  //how long does the browser should cache the policy
}));


store.on('error', (err) => {
	console.log('Session MongoDB error:' + err);
});

app
	.set('view engine', 'ejs')
	.set('views', 'src/views')
	.use(express.static('src/static'))
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(express.json({ limit: '1mb' }))
	.listen(port, () => {
		console.log('The server is running on port ' + port);
	});

app.use(router);