const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient, Prisma } = require("@prisma/client");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

const verifyCallback = (username, password, done) => {
  const prisma = new PrismaClient();

  // I'm pretty sure this isn't correct
  prisma.user
    .findUnique({
      where: {
        username: username,
      },
    })
    .then((user) => {
      if (!user) {
        // user not found
        return done(null, false);
      }
      const isValid = validatePassword(password, user.hash);

      if (isValid) {
        // validation OK
        return done(null, user);
      } else {
        // vaidation failed
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new JwtStrategy(opts, verifyCallback);
passport.use(strategy);
