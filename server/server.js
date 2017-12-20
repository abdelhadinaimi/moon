const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

/* == initialization == */
const app = require('./app');

/* Request handlers */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media');
const dateRoutes = require('./routes/data');
app.use('/api', authRoutes,userRoutes,mediaRoutes,dateRoutes);

app.get('/api/secret',(req,res)=>{
  console.log("GET : /secret",req.isAuthenticated());
  console.log("Session",req.user);
  if(req.isAuthenticated()){
    res.send('Welcome to the secret !');
  }
  else{
    res.redirect('/');
  }
});

app.use(express.static(path.resolve(__dirname, '..','public')));// Serve static assets

app.get('*', (req, res,next) => {
  res.sendFile(path.resolve(__dirname, '..','public','index.html')); //get the built react app
});

//Lunching the server
app.listen(PORT, ()=> console.log('Listening on port : ' + PORT)) ;
