require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// console.log(process.env.SPOTIFY_ID);
// console.log(process.env.SPOTIFY_SECRET);

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

// console.log(spotify);

//user input of predetermined command
let inputCommand = process.argv[2];
// user input
let inputCommand2 = process.argv[3];

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
      if (response.data.length === 0) {
        console.log("No Available data")
      } else {
        console.log(`
        Artist: ${inputCommand2}`);
        //first set of data
        console.log(`        ----------
        Event Venue: ${response.data[0].venue.name}
        Venue Country: ${response.data[0].venue.country}
        Venue City: ${response.data[0].venue.city}
        Date Time: ${moment(response.data[0].datetime).format('MMM Do YY')}
        ----------`);
        //second set of data
        console.log(`        ----------
        Event Venue: ${response.data[1].venue.name}
        Venue Country: ${response.data[1].venue.country}
        Venue City: ${response.data[1].venue.city}
        Date Time: ${moment(response.data[1].datetime).format('MMM Do YY')}
        ----------`);
        //third set of data
        console.log(`        ----------
        Event Venue: ${response.data[2].venue.name}
        Venue Country: ${response.data[2].venue.country}
        Venue City: ${response.data[2].venue.city}
        Date Time: ${moment(response.data[2].datetime).format('MMM Do YY')}
        ----------`);
      }
    });
};

//function for OMDB movie data
function movieThis() {
  inputCommand2 = (!inputCommand2) ?
   ("Mr. Nobody")
  //  &&
  //   console.log(`     ----------
  // If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
  // It's on Netflix!
  // ----------`)
   : process.argv[3];
  // if (!inputCommand2) {
  //   inputCommand2 = "Mr. Nobody";
  // console.log(`     ----------
  // If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
  // It's on Netflix!
  // ----------`);
  // }
  // if (typeof inputCommand2 !== 'undefined'){
  //   inputCommand2 = "Mr. Nobody";
  //   console.log(`     ----------
  //   If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
  //   It's on Netflix!
  //   ----------`);
  // }

  let queryurl = (`http://www.omdbapi.com/?t=${inputCommand2}&y=&plot=short&apikey=trilogy`);
  // console.log(queryurl);
  axios.get(queryurl).then(
    function (response) {
      // console.log(JSON.stringify(response.data, null, 2));
      console.log(`      ----------
      Title: ${response.data.Title}
      Released Date: ${response.data.Released}
      IMDB Rating: ${response.data.Ratings[0].Value}
      Rpttem Tomatoes Rating: ${response.data.Ratings[1].Value}
      Production Country: ${response.data.Country}
      Language: ${response.data.Language}
      Plot: ${response.data.Plot}
      Cast: ${response.data.Actors}
      ----------`);
    });
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);
    let dataArr = data.split(",");
    // console.log(dataArr);
    // let inputCommand = dataArr[0];
    let inputCommand2 = dataArr[1];
    // (dataArr[1]).split(" ").join("").toLowerCase();
    // console.log(inputCommandDO);
    // console.log(inputCommand2DO);

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

  });
}

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