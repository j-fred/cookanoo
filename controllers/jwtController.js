var jwt = require('jsonwebtoken');

//export du module de la fonction ensure
module.exports = {
    ensureToken : function (req, res, next) {
        console.log("headers = ", req.headers["authorization"]);
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).send("accès refusé");
        }
    },
    verifAdmin : function (req, res, next) {  
        jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
            if (err) {
                res.status(403).send("nope");
            } else {
                if (data.droit===2) {    
                    console.log("droit ok");             
                    req.body.droit = data.droit;       
                    next(); 
                }else{
                    res.status(403).send("Vous n'avez pas le grade necessaire pour allez ici");
                }
            }
          });
    }
}