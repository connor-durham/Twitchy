const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://connor-durham:bg2987dw*@cluster0-mamux.mongodb.net/Twitchy?retryWrites=true&w=majority`);

const User = require('./models/User');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(bodyParser.json());


app.get('/user', function(req, res) {
  User.find({ username: req.query.username}).then((data) => {

    const myPerson = {
      username: data[0].username,
      favorites: data[0].favorites,
      msg: 'I found him'
    };
    res.send(myPerson);
  });
});

app.post('/favorite', (req, res) => {

  // console.log(req.body)
  
  let favorite = req.body.params.streams.user_name
  let user = req.body.params.username

  User.updateOne(
    { username: user},
    { $addToSet: { 
      favorites: favorite 

    }}
  ).then((data) => {
    console.log(data)
  })

  res.json("successfully favorited!")
})

app.delete('/deleteFavorite/:id/:streamer', (req, res) => {

  console.log(req.params.id)
  console.log(req.params.streamer)
  User.update(
    { username: req.params.id},
    { $pull: { 
      favorites: req.params.streamer 

    }}
  ).then((data) => {
    console.log(data)
  })


  res.json("successfully deleted!")
})


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
