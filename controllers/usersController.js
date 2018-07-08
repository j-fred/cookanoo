var mongoose = require('mongoose');

var User = require("../models/User");

var jwt = require('jsonwebtoken');

const SECRET = 'secret_key_goes_here';

module.exports = {
    //Liste les données
    login: function (req, res) {        
        console.log("req = > ",req.body);
        User.findOne({
            username: req.body.username
        }).exec(function (err, data) {
            if (err) {
                console.log('Error : ', err);
            } else {
                console.log("data = > ",data);
                var donnees = { username: data.username, droit: data.droit }
                // then return a token, secret key should be an env variable
                const token = jwt.sign(donnees, SECRET, { expiresIn: '60s' });
                res.json({
                    message: 'Authenticated! Use this token in the "Authorization" header',
                   token: token
                });
                // res.render("../views/phones/create", {
                //     title: 'User 974'
                // });
            }
        });
    },
    //Liste les données
    logout: function (req, res) {
        User.find({}).exec(function (err, datas) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/phones/index", {
                    title: 'User 974',
                    datas: ["samsung", "iphone", "LG"]
                });
            }
        });
    },
    //Liste les données
    list: function (req, res) {
        User.find({}).exec(function (err, datas) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/phones/index", {
                    title: 'User 974',
                    datas: ["samsung", "iphone", "LG"]
                });
            }
        });
    },

    //Affiche la donnée par son id
    show: function (req, res) {
        User.findOne({
            _id: req.params.id
        }).exec(function (err, data) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/phones/show", {
                    data: data
                });
            }
        });
    },

    //redirection à la page de creation
    create: function (req, res) {
        res.render("../views/phones/create");
    },

    //enregistrement des données
    save: function (req, res) {
        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                console.log(err);
                res.render("../views/phones/create");
            } else {
                console.log("creation OK");
                res.redirect("/phones/show/" + user._id);
            }
        });
    },

    //edition de la donnée par son id
    edit: function (req, res) {
        var user = new User(req.body);

        User.findOne({
            _id: req.params.id
        }).exec(function (err, data) {
            if (err) {
                console.log("Error ", err);
            } else {
                res.render("../views/phones/edit", {
                    data: data
                });
            }
        });
    },

    //gestion de l'edition de la donnée
    update: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            $set: {
                nom: req.body.nom,
                prix: req.body.prix
            }
        }, {
            new: true
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.render("../views/phones/edit", {
                    data: req.body
                });
            }
            res.redirect("/phones/show/" + data._id);

        });
    },

    //gestion de l'edition de la donnée
    push: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            $set: {
                nom: req.body.nom,
                prix: req.body.prix
            },
            "$push": {
                dim: req.body._id
            }
        }, {
            new: true
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.render("../views/phones/edit", {
                    data: req.body
                });
            }
            res.redirect("/phones/show/" + data._id);

        });
    }
};