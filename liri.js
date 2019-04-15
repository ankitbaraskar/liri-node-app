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
    // case "withdraw":
    //     withdraw(amount);
    //     break;
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
            result.Location = element.venue.city+', '+element.venue.country;

            var convertedDate = moment(element.datetime,"YYYY-MM-DD")
            result.Date = convertedDate.format("MM/DD/YYYY");
            console.table(result);
        });

    })
        .catch(function (error) {
            
            console.log(error);
        });
}


function spotifyCall (){
    
}