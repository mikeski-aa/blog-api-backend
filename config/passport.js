const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient, Prisma } = require("@prisma/client");
const validatePassword = require("../lib/passportUtils").validatePassword;
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

const verifyCallback = (password, done) => {
  const prisma = new PrismaClient();
  console.log(password);

  // I'm pretty sure this isn't correct
  prisma.user
    .findUnique({
      where: {
        id: payload.id,
      },
    })
    .then((user) => {
      if (!user) {
        // user not found
        return done(null, false);
      }
      const isValid = validatePassword(payload.password, user.hash);

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
