const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const User = require("../models/user");

const scopes = ["identify", "email", "guilds"];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CLIENT_REDIRECT_URI,
      scope: scopes,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ discordId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            discordId: profile.id,
            discordName: profile.username,
            email: profile.email,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
