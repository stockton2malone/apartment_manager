const config = require('./config');
const Auth0Strategy = require('passport-auth0');
const express = require('express')
const {domain, clientID, clientSecret} = config;

const app = express();

module.exports = new Auth0Strategy({
    domain:       domain,
    clientID:     clientID,
    clientSecret: clientSecret,
    callbackURL:  '/api/auth/login',
    scope: 'openid profile user_metadata'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      console.log(extraParams.id_token)
      console.log(profile)
      done(null, profile); //this will be removed once db is connected here
      
    }
  );