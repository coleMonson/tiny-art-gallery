const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/tinyArtGallery', {
  useNewUrlParser: true
});

// Create a schema for art
const artSchema = new mongoose.Schema({
  title: String,
  artist: String,
  art: [Number],
});

// Create a model for art in the gallery.
const Art = mongoose.model('Art', artSchema);

// Create a new art piece in the gallery
app.post('/api/art', async (req, res) => {
  const art = new Art({
    title: req.body.title,
    artist: req.body.artist,
    art: req.body.art,
  });
  try {
    await art.save();
    res.send(art);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all the art in the gallery.
app.get('/api/art', async (req, res) => {
  try {
    let art = await Art.find();
    res.send(art);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/art/:id', async (req, res) => {
  try {
    let art = await Art.findOne({
      _id: req.params.id
    });
    art.title = req.body.title;
    art.artist = req.body.artist;
    art.art = req.body.art;
    await art.save();
    res.send(art);
  } catch (error) {
    console.log("edit error: " + error);
    res.sendStatus(500);
  }
});

app.delete('/api/art/:id', async (req, res) => {
  try {
    await Art.deleteOne({
      _id: req.params.id
    });
    res.send(true);
  } catch (error) {
    console.log("delete error: " + error);
    res.sendStatus(500);
  }
});



app.listen(3001, () => console.log('Server listening on port 3001!'));