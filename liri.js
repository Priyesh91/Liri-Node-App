require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

// console.log(process.env.SPOTIFY_ID);
// console.log(process.env.SPOTIFY_SECRET);

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

// console.log(spotify);

const inputCommand = process.argv[2];
const inputCommand2 = process.argv[3];

function spotifySong() {

  spotify
    .search({
      type: 'track',
      query: inputCommand2,
      limit: 1
    })
    .then(function (response) {
      // console.log(response);
      let song = response.tracks.items[0];
      // console.log(song);
      console.log(`----------
    Title: ${song.name}
    Artist: ${song.artists[0].name}
    Album: ${song.album.name}
    Preview Link: ${song.preview_url}
    ----------`);
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log("SpotifySongActivated");
};


function concertThis() {
  let queryurl = (`https://rest.bandsintown.com/artists/${inputCommand2}/events?app_id=codingbootcamp`);
  // console.log(queryurl);
  axios.get(queryurl).then(
    function (response) {
      console.log(response);
    }
  )
  console.log("working 1");
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