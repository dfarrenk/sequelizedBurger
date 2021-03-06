//Controller holds the appropriate routes

var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models/");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    db.Burger.findAll().then(function(data) {
        var handlebarsObject = {
            burgers: data
        };
        // console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    // Abort on nameless burger.
    if (req.body.burgerName === "") {
        return res.redirect("/");
    }

    db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function(data) {
        res.redirect("/");
    });

    // burger.insertOne(req.body.burgerName, function(result) {
    //     // console.log(result);
    //     // The page must be reloaded, why not here, at the end of the callback chain?
    //     res.redirect("/");
    // });
});

router.put("/api/burgers/:id", function(req, res) {
    db.Burger.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.redirect("/");
    });
    // burger.updateOne(req.params.id, function(result) {
    //     // console.log(result);
    //     res.redirect("/");
    // });
});

// Export routes for server.js to use.
module.exports = router;
