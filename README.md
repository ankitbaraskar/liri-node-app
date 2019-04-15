# liri-node-app

## Setup

* The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   1. Visit <https://developer.spotify.com/my-applications/#!/>

   2. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   3. Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   4. On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

* Git clone the liri-node-app repository

* Create .env file and add your **client id** and **client secret** to the file like so:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

* Install dependencies automatically from package.json:
```
npm install
```

## Features

#### Commands Available
1. `concert-this`

2. `spotify-this-song`

3. `movie-this`

4. `do-what-it-says`


#### Use and Details
1. `node liri.js concert-this <artist>`
    * This will search Bands in Town API with the artist specified and give back venue details of recent events. Here is an example:

    ![](images/concert-this.png?raw=true)



2. `node liri.js spotify-this-song <song name here>`
    * This will display song specific informtion using the Spotify API. Here is an example:

    ![](images/spotify-this-song-with-parameter.png?raw=true)



    * If no paramerters are entered, it will default to "The Sign" by Ace of Base. Here is an example:

    ![](images/spotify-this-song-no-parameter.png?raw=true)



3. `node liri.js movie-this <movie name here>`
    * This will output movie spefic information based on the search parameter using the OMDB API. Here is an example:

    ![](images/movie-this-with-parameter.png?raw=true)



    * If no paramerters are entered, it will default to the move "Mr. Nobody". Here is an example:

    ![](images/movie-this-no-parameter.png?raw=true)



4. `node liri.js do-what-it-says`
    * Will run the command and search parameter written in "random.txt" file. 
    * Here it is with `spotify-this-song,"I Want it That Way"` in the file:

    ![](images/do-what-it-says-song.png?raw=true)



    * Here it is with `movie-this,"How to train your dragon"` in the file:

    ![](images/do-what-it-says-movie.png?raw=true)



---
## END