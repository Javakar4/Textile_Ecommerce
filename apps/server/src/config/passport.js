import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/UserSchema.js";
import { config } from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: `${config.BACKEND_URL}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email
        const existingUser = await User.findOne({ email: profile.emails[0]?.value });
        if (existingUser) {
          // Link Google ID if not already linked
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
          }
          // Update missing info
          if (!existingUser.avatar) {
             existingUser.avatar = profile.photos[0]?.value;
          }
          if (!existingUser.fullName) {
             existingUser.fullName = profile.displayName;
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          username: profile.emails[0]?.value.split('@')[0] + "_" + Math.floor(Math.random() * 10000),
          fullName: profile.displayName,
          email: profile.emails[0]?.value,
          avatar: profile.photos[0]?.value,
          isEmailVerified: true, // Google emails are already verified
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

// Serialization (if using sessions, though we might be using JWT)
// For now, let's keep it simple or strictly use JWT in the callback.
// If we use session:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
