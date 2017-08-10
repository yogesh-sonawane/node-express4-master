
var Express = require("express");
var App = Express();
var Morgan = require("morgan");
var BodyParser = require("body-parser");
var Cors = require("cors");
App.use(BodyParser.json({ limit: "60mb" }));
App.use(BodyParser.urlencoded({ limit: "60mb", extended: true }));
App.use(Morgan("dev"));

App.all("/*", function (request, response, next) {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, x-access-token, Authorization, Accept, X-Requested-With";
    headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, PATCH, OPTIONS";
    headers["Access-Control-Max-Age"] = "86400";
    if (request.method === "OPTIONS") {
        console.log("!OPTIONS");
        response.writeHead(200, headers);
        response.end();
    } else {
        next(request, response);
    }
});

App.use(function (error, request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token, Content-Length, Authorization, Accept, X-Requested-With");
    response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    response.setHeader("Access-Control-Max-Age", "86400");
    console.log("===========================================================\n");
    next();
});


App.use(Cors());
var JsonWebToken = require("jsonwebtoken");
var ApiRoutes = Express.Router();
var Db = require("./common-lib/default-db-settings");
/*
ApiRoutes.use(function (req, res, next) {
    var tokenBase = Db.tokenBase();
    var encodedSecret = Db.Base64().encode(tokenBase.Secret);
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        JsonWebToken.verify(token, encodedSecret, function (err, decoded) {
            if (err) {
                return res.status(403).json({ success: false, message: "Failed to authenticate token.", DecodedSecret: encodedSecret });
            } else {
                req.decoded = decoded;
                return next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});
*/

var ExpressPath = require("express-path");
console.log("\n===========================================================\n");
/*
App.use("/api", ApiRoutes);
ExpressPath(App, "route-map");
*/
App.use("/api", ApiRoutes);
ExpressPath(App, "./bin/route-main")
App.set("port", process.env.PORT || 6060);

var Server = App.listen(App.get("port"), function () {
    console.log("\n===========================================================\n");
    console.log("Node server listening on port " + Server.address().port + ".\n");
    console.log("===========================================================\n");
});
