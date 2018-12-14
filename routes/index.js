const express = require("express");
const router = express.Router();
const pageController = require("./../controllers/page_controller");
const authenticationController = require("./../controllers/authentication_controller");
const {celebrate, Joi } = require("celebrate");
const {authorize, authRedirect} = require("./../middleware/authentication_middleware");

router.use("/register",authRedirect);
router.use("/login",authRedirect);

router.get("/", pageController.index);

router.get("/login",authenticationController.loginForm);

router.post("/login",celebrate({
    body: {
        email:Joi.string().required(),
        password: Joi.string().required()
    }
}),authenticationController.loginVerify);

router.get("/register",authenticationController.make);

router.post("/register",celebrate({
    body: {
        email:Joi.string().required(),
        password: Joi.string().required()
    }
}),authenticationController.create);

router.get("/dashboard",authorize,pageController.dashboard);

router.get("/logout",authenticationController.logout)

module.exports = router;