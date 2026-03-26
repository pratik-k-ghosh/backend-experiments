import passport from "passport";
import pkg from "passport-local";
import User from "../model/users.js";

const { strategy } = pkg;

passport.use(
  new strategy(async (username, password, done) => {
    const person = await User.findOne({ username: username });
    if (!person) {
      done(null, false, { msg: "User doesn't exist" });
    }
    try {
      const checkPassword = await User.comparePassword(password);
      if (!checkPassword) {
        done(null, false, { msg: "Wrong Password" });
      } else {
        done(null, person);
      }
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
