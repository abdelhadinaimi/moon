let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;


let pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user:'postgres',
  password: '123456789',
  database: 'moonDB',
  max: 10
});


pool.connect((err,db,done) => {
  let username = 'ruffneck';
  let email = 'ruff@f.com';
  let hash = "sgssd654qc1q";
  if(err){
    return console.log(err);
  }else{
    db.query('insert into users (username,email,hash) values($1,$2,$3)',[username,email,hash],(err,table)=>{
      done();
      if(err){
        return console.log(err);
      }else {
        console.log("Insert successful");
        db.end();
      }
    })
  }
})
let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(morgan('dev'));

app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(PORT, ()=> console.log('Listening on port : ' + PORT)) ;
