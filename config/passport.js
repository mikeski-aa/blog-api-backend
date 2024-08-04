const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { PrismaClient, Prisma } = require("@prisma/client");

const verifyCallback = (username, password, done) => {
  const prisma = new PrismaClient();

  prisma.User.findUnique({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        console.log("USER NOT FOUND");
        // user not present in DB
        // pass done callback to passport stating user was not found
        return done(null, false);
      }
      // function checking validity from utils -> compares password hash v.s stored hash
      // true or false
      const isValid = validatePassword(password, user.hash);

      if (isValid) {
        // validation passed
        return done(null, user);
      } else {
        console.log("invalid pass");
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

// JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (jwt_payload, done) => {
      const prisma = new PrismaClient();
      prisma.User.findUnique({
        where: {
          id: jwt_payload.id,
        },
      })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, { message: "Token mismatch" });
        });
    }
  )
);

// new strategy requires verify callback
// localstrategy is the name of strategy found on passport's strategy list
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
