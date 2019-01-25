require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

// console.log(process.env.SPOTIFY_ID);
// console.log(process.env.SPOTIFY_SECRET);

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

// console.log(spotify);

//user input of predetermined command
const inputCommand = process.argv[2];
// user input
const inputCommand2 = process.argv[3];

//function for spotify
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

//function for bands in town
function concertThis() {
  let queryurl = (`https://rest.bandsintown.com/artists/${inputCommand2}/events?app_id=codingbootcamp`);
  // console.log(queryurl);
  axios.get(queryurl).then(
    function (response) {
      // console.log(JSON.stringify(response.data, null, 2));
      // console.log(inputCommand2);
      // console.log(JSON.stringify(response.data[0].venue.name));
      // console.log(JSON.stringify(response.data[0].venue.country));
      // console.log(JSON.stringify(response.data[0].venue.city));
      // console.log(JSON.stringify(response.data[0].datetime));
      (response.data.length === 0) ?
       console.log("No Avaible data"):
       console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.country);
      console.log(response.data[0].venue.city);
      console.log(response.data[0].datetime); 
    });
    
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