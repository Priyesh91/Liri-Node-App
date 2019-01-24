require("dotenv").config();

let keys = require("./keys.js");

console.log(process.env.SPOTIFY_ID);
console.log(process.env.SPOTIFY_SECRET);
let Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

console.log(spotify);

const inputCommand = process.argv[2];

function concertThis(){
  console.log("working 1");
};

function spotifySong() {
  console.log("working 2");
};

function movieThis() {
  console.log("working 3");
};

function doWhatItSays() {
  console.log("working 4");
};


switch (inputCommand) {
  case "concert-this":
  return concertThis();

  case "spotify-this-song":
  return spotifySong();

  case "movie-this":
  return movieThis();

  case "do-what-it-says":
  return doWhatItSays();

};