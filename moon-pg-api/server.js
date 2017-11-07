let express = require('express');
let bodyParser = require('body-parser');
const passport = require('passport');
let pg = require('pg');
const PORT = 3000;

/* == initialization == */
let app = express();

//app.use(express.static('./static/'));
/* == Parsers == */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//app.use(morgan('dev'));

app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Request handlers */
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

//Lunching the server
app.listen(PORT, ()=> console.log('Listening on port : ' + PORT)) ;
