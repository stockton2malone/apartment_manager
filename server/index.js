//Setup for the Express app
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    passport = require('passport'),
    path = require('path'),
    port = process.env.PORT || 3001,
    session = require('express-session'),
    Twilio = require("twilio"),
    strategy = require('./strategy');
    nc = require('./controllers/notesController'),
    tc = require('./controllers/ticketsController'),
    uc = require('./controllers/usersController');

require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }))

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
        name: user._json['https://example.com/name'] || '',
        complex: user._json['https://example.com/complex'] || '',
        unit: user._json['https://example.com/unit'] || '',
        email: user._json.name || '',
        phone: user._json['https://example.com/phone'] || '',
        permissionForTexts: (user._json['https://example.com/notifications'] === 'true' ? true : false),
        role: user._json['https://example.com/role'] || '',
        activeStatus: (user._json['https://example.com/status'] === 'true' ? true : false)
    });
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});
//--Twilio setup--
const {
    TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID,
    PHONE_NUMBER
  } = require(`${__dirname}/config.js`);
  const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//Auth Endpoints
app.get('/api/auth', passport.authenticate('auth0', {
    successRedirect: '/api/auth/login', 
    failureRedirect: '/#/',
    failureFlash: true
  }));

//tweak this once the db file is in place and lock screen is set up
app.get('/api/auth/login', passport.authenticate('auth0'), (req,res,done) => {
    console.log('res.sessionID: ', req.sessionID)
    //console.log('this is first: ', req.user._json['https://example.com/firstname']);
    //console.log('this is last: ', req.user._json['https://example.com/lastname']);
    //console.log('this is iscoach: ', req.user._json['https://example.com/iscoach']);
    console.log("Passport.user: ",req.session.passport.user);//this gives me what was set for user and id
    let passportUser = req.session.passport.user;
    //console.log(passportUser.id)
    const dbInstance = app.get('db');

    //verify this on the create user db file
    dbInstance.readUser([passportUser.id])
        .then(user => {
            //console.log('user: ', user)
            if(user.length && user[0].user_id){
                return done(null, user);
            } else{
                dbInstance.createUser([passportUser.id, passportUser.name, passportUser.unit, passportUser.complex, passportUser.email, passportUser.phone, passportUser.permissionForTexts, passportUser.activeStatus, passportUser.role])
                .then(user => {
                    console.log('User created in db: ',user[0]);
                    //console.log('profile, ', profile)
                    
                    return done(null, user)
                })
                
            }
        })
        console.log('this is req.user', req.user);
        //console.log('this is passport.user', req.session.passport.user)
    //check the url once routing is setup
    res.redirect('http://localhost:3000/#/')//this works
});

app.get('/api/auth/me', (req, res) => {
    res.status(200).send(req.isAuthenticated())
});

app.get('/api/user', (req, res) => {
    const dbInstance = app.get('db');
    const { session } = req;
    dbInstance.readUser([session.passport.user.id])
        .then(user => {
            console.log(user[0]);
            res.status(200).send(user[0]);
        })
        .catch(err => console.log(err));
})

app.get('/api/auth/logout', (req, res) => {
    //console.log('this is passport.user', req.session.passport.user)
    req.logOut();
    console.log('Successful logout!',req.session.passport.user)
    //check the url once the routing is setup
    return res.redirect('http://localhost:3001/#/');
    
  })

//User Endpoints
// ---- Update User Information ----

// ---- Delete User ----

// Image Endpoints
app.get('/api/image', nc.getImage);
app.get('/api/video', nc.getVideo);

//Ticket Endpoints
// ---- Single Ticket ----
app.get('/api/ticket/:id', tc.getTicket);
app.post('/api/ticket', tc.createTicket)
app.patch('/api/ticket/:id', tc.updateTicket);
app.patch('/api/ticket/:id/status', tc.updateTicketStatus);
app.patch('/api/ticket/:id/solved', tc.updateTicketSolved)
app.delete('/api/ticket/:id', tc.deleteTicket);

// ---- Multiple Tickets ----
app.get('/api/tickets/owner/:id', tc.getOwnerTickets);
app.get('/api/tickets/worker/:id', tc.getMaintenanceTickets);
app.get('/api/tickets/tenant/:id', tc.getTenantTickets);

// -- Ticket Notes ----
app.get('/api/ticket/:id/notes', nc.getNotes);
app.post('/api/ticket/:id/notes', nc.createNote);
app.patch('/api/ticket/:id/notes/:note_id', nc.updateNote);
app.delete('/api/ticket/:id/notes/:note_id', nc.deleteNote)

// -- User Info -- 
app.get('/api/users/:id', uc.getUser)
app.get('/api/workers', uc.getWorkers)
app.get('/api/owner', uc.getOwner)

//--Twilio Messages--
app.post("/api/message/status", (req, res) => {
    let dbInstance = req.app.get("db");
    console.log('this is req.body: ', req.body)
    //getting a recipient id to make a db call to get user_phone and the ticket id for message
    dbInstance.readUser([req.body.recipient]).then(user => {
        console.log('this is user', user[0])
      if (user[0].text_permissions && req.body.ticket.permission_notifications) {
        twilio.messages
          //creates message if text permissions global and ticket are true
          .create({
            to: `+1${user[0].user_phone}`,
            from: PHONE_NUMBER,
            body: `This is an Upkeep notification.The status of ticket ${req.body
              .ticket.ticket_id} has been changed to ${req.body.ticketStatus}`
          })
          .then(message => console.log("twilio message PING"))
          .catch(err => console.log(err));
      }
    });
  });

//For hosting and running the app
app.use(express.static(`${__dirname}/../client/build`));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.listen(port, console.log(`Stockton to Malone...connects at the buzzer!!! on port ${port}`));