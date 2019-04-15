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
        concert(searchParameters);
        break;
    case "spotify-this-song":
        spotifyCall(searchParameters);
        break;
    case "movie-this":
        movieCall(searchParameters);
        break;
    case "do-what-it-says":
        readFile();
        break;
    default:
        console.log("Entered Default case");
}

function concert(searchParameters) {

    if (Array.isArray(searchParameters)) {
        var artist = searchParameters.join(' ');
    }
    else {
        var artist = searchParameters;
    }

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


function spotifyCall(searchParameters) {

    if (Array.isArray(searchParameters)) {
        var songNameRequest = searchParameters.join(' ');
    }
    else {
        var songNameRequest = searchParameters;
    }

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


function movieCall(searchParameters) {

    if (Array.isArray(searchParameters)) {
        var movieNameRequest = searchParameters.join(' ');
    }
    else {
        var movieNameRequest = searchParameters;
    }

    if (movieNameRequest) {
        var url = "http://www.omdbapi.com/?i=tt3896198&apikey=e043a54d&t=" + movieNameRequest + "&type=movie&plot=full";
    }
    else {
        var url = "http://www.omdbapi.com/?i=tt3896198&apikey=e043a54d&t=Mr.Nobody&type=movie&plot=full";
    }

    axios.get(url).then(function (response) {
        var data = response.data;
        //    console.log(response);
        // console.log(data[0]);
        var movieTitle = data.Title;
        var year = data.Year;
        var imdbRatingKey = data.Ratings[0].Source;
        var imdbRatingValue = data.Ratings[0].Value;
        var RottenRatingKey = data.Ratings[1].Source;
        var RottenRatingValue = data.Ratings[1].Value;
        var country = data.Country;
        var language = data.Language;
        var plot = data.Plot;
        var actors = data.Actors;

        var result = {};

        result.Movie = movieTitle;
        result.Year = year;
        result[imdbRatingKey] = imdbRatingValue;
        result[RottenRatingKey] = RottenRatingValue;
        result.Country = country;
        result.Language = language;
        result.Plot = plot;
        result.Actors = actors;

        var prettyResult = JSON.stringify(result, null, 4);
        console.log(prettyResult);

    })
        .catch(function (error) {

            console.log(error);
        });
}


function readFile() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var command = dataArr[0];
        var string = dataArr[1];
        var searchParameters = string.replace('"', '').replace('"', '');

        switch (command) {
            case "concert-this":
                concert(searchParameters);
                break;
            case "spotify-this-song":
                spotifyCall(searchParameters);
                break;
            case "movie-this":
                movieCall(searchParameters);
                break;
            default:
                console.log("Entered Default case in the read file function");
        }

        // We will then re-display the content as an array for later use.
        // console.log(search);

    });
}
