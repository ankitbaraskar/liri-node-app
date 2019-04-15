require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");

// Grab the axios package...
var axios = require("axios");

// require moment package
var moment = require('moment');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// const args = process.argv.slice(2);
const command = process.argv[2];
const searchParameters = process.argv.slice(3);

// console.log(command);
switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyCall();
        break;
    case "movie-this":
        movieCall();
        break;
    // case "lotto":
    //     lotto();
    //     break;
    default:
        console.log("Entered Default case");
}

function concert() {

    var artist = searchParameters.join(' ');
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(url);

    axios.get(url).then(function (response) {
        var data = response.data;
        //    console.log(response);
        // console.log(data[0]);

        data.forEach(element => {
            var result = {};
            result.VenueName = element.venue.name;
            result.Location = element.venue.city + ', ' + element.venue.country;

            var convertedDate = moment(element.datetime, "YYYY-MM-DD")
            result.Date = convertedDate.format("MM/DD/YYYY");
            console.table(result);
        });

    })
        .catch(function (error) {

            console.log(error);
        });
}


function spotifyCall() {

    var songNameRequest = searchParameters.join(' ');

    if (songNameRequest) {
        var Songurl = "https://api.spotify.com/v1/search?q=" + songNameRequest + "&type=track&limit=1"
    }
    else {
        var Songurl = "https://api.spotify.com/v1/search?q=The Sign Ace of Base&type=track&limit=1"
    }

    spotify.request(Songurl).then(function (response) {
        var artistname = response.tracks.items[0].album.artists[0].name;
        var songName = response.tracks.items[0].name;
        var previewLink = response.tracks.items[0].preview_url;
        var albumName = response.tracks.items[0].album.name;

        var result = {};
        result.Artist = artistname;
        result.Song = songName;
        result.Preview_URL = previewLink;
        result.Album = albumName;
        console.table(result);
        // console.log(response.tracks.items[0].preview_url);
    })
        .catch(function (err) {
            console.log(err);
        });
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

function movieCall(){
    
}