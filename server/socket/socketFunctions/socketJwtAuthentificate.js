const jwtAuth = require('socketio-jwt-auth');
const User = require('../../databases/mongo/models/User');
const secret = require('../../config/keys').secretOrKey;

module.exports = bool => {
  return jwtAuth.authenticate(
    {
      secret, // required, used to verify the token's signature
      algorithm: 'HS256', // optional, default to be HS256
      succeedWithoutToken: bool
    },

    (payload, done) => {
      console.log('Payload in AUTH ', payload);
      // you done callback will not include any payload data now
      // if no token was supplied
      if (payload && payload.id) {
        User.findById(payload.id, function(err, user) {
          if (err) {
            // return error
            return done(err);
          }
          if (!user) {
            // return fail with an error message
            return done(null, false, 'user does not exist');
          }
          // return success with a user info
          console.log('Authentication passed!!!');
          return done(null, user);
        });
      } else {
        console.log('Authentication Failed! You are enter as a guest!!!');
        return done(); // in your connection handler user.logged_in will be false
      }
    }
  );
};
