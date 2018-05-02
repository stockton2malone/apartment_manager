//Setup for the Express app
const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      cors          = require('cors'),
      massive       = require('massive'),
      passport      = require('passport'),
      path          = require('path'),
      port          = process.env.PORT || 3001,
      session       = require('express-session'),
      strategy      = require('./strategy');
      controller    = require('./controller');

require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors());
app.use(bodyParser.json());

//Connect to the DB
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    console.log('Connected to the DB successfully');
    app.set('db', dbInstance)
}).catch(err => {
    console.log('There was an error connecting to the DB: ', err);
});

//Setting up Express-Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//Setting up Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        fullname: '',
        address: '',
        unit: '',
        city: '',
        state: '',
        zip: '',
        complex: '',
        email: '',
        phone: '',
        permissionForTexts: '',
        activeStatus: '',
        role: ''
    });
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

//Auth Endpoints
app.get( '/login', 
  passport.authenticate('auth0', 
    { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }
  )
);

app.get('/me', ( req, res, next) => {
    if ( !req.user ) {
      res.redirect('/login');
    } else {
      // req.user === req.session.passport.user
      // console.log( req.user )
      // console.log( req.session.passport.user );
      res.status(200).send( JSON.stringify( req.user, null, 10 ) );
    }
  });


//User Endpoints




//Ticket Endpoints
// ---- Single Ticket ----
app.get('/api/ticket/:id', controller.getTicket);
app.post('/api/ticket', controller.createTicket)
app.patch('/api/ticket/:id', controller.updateTicket);
app.delete('/api/ticket/:id', controller.deleteTicket);

// ---- Multiple Tickets ----
app.get('/api/tickets/owner/:id', controller.getOwnerTickets);
app.get('/api/tickets/maintenance/:id', controller.getMaintenanceTickets);
app.get('/api/ticket/tenant/:id', controller.getTenantTickets);

// -- Ticket Notes ----
app.get('/api/ticket/:id/notes', controller.getNotes);
app.post('/api/ticket/:id/notes', controller.createNote);
app.patch('/api/ticket/:id/notes/:note_id', controller.updateNote);
app.delete('/api/ticket/:id/notes/:note_id', controller.deleteNote)

//For hosting and running the app
app.use(express.static( `${__dirname}/../client/build`));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.listen(port, console.log(`Stockton to Malone...connects at the buzzer!!! on port ${port}`));