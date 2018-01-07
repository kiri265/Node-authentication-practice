var strategy = require('passport-local').Strategy;
var users = {};

module.exports = function (passport) {
    // // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		//return the unique id for the user
		done(null,user.username);
	});

    // used to deserialize the user
    
    passport.deserializeUser(function(username, done) {
        console.log('deserializing user:',username);
		return done(null, users[username]);

	});


    passport.use('login', new strategy({ passReqToCallback: true }, 
        function (req, username, password, done) {
        if (!users[username]) {
            console.log('username not exists');
            return  done(null, false);
        }
        else if (users[username].password === password) {
            console.log('login successful ' + username);
            return  done(null, users[username])
        }

        console.log('incorrect passowrd ');
        return done(null, false);
    }
    ));
    passport.use('signup', new strategy({ passReqToCallback: true },
        function (req, username, password, done) {
        if (users[username]) {
            console.log('username already exists');
            return done(null, false);
        }
        users[username] = {
            username: username,
            password: password
        }
        console.log('registration successful ' + username);
        return done(null, users[username]);
    }
    ));



};