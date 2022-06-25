const router = require("express").Router();
const passport = require("passport");

//@route GET /auth/discord
router.get("/discord", passport.authenticate("discord"));

//@route GET /auth/discord/callback
router.get(
  "/discord/callback",
  passport.authenticate("discord"),
  (req, res, next) => {
    res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/profile`);
  }
);

// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/`);
});

module.exports = router;
