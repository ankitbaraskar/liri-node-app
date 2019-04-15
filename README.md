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




