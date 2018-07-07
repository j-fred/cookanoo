var mongoose = require('mongoose');

var Particulier = require("../models/Particulier");

module.exports = {
    //Liste les données
    list : function(req, res) {
        Particulier.find({}).exec(function(err, datas){
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("../views/phones/index",{datas:datas} );
            } 
        });
    },

    //Affiche la donnée par son id
    show : function(req, res) {
        Particulier.findOne({_id:req.params.id}).exec(function(err, data){
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("../views/phones/show",{data:data});
            } 
        });
    },

    //redirection à la page de creation
    create : function(req, res){
        res.render("../views/phones/create");
    },

    //enregistrement des données
    save: function(req, res){
        var particulier = new Particulier(req.body);

        particulier.save(function(err){
            if(err){
                console.log(err);
                res.render("../views/phones/create");
            } else{
                console.log("creation OK");
                res.redirect("/phones/show/" + particulier._id);
            } 
        });
    },

    //edition de la donnée par son id
    edit : function(req, res){
        var particulier = new Particulier(req.body);

        Particulier.findOne({_id:req.params.id}).exec(function(err, data){
            if(err){
                console.log("Error ", err);
            } else{
                res.render("../views/phones/edit",{data: data} );
            } 
        });
    },

    //gestion de l'edition de la donnée
    update : function(req, res){
        Particulier.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix} },{new: true}, function (err, data){
            if (err){
                console.log(err);
                res.render("../views/phones/edit",{data:req.body} );
            } 
            res.redirect("/phones/show/" + data._id);
            
        });
    },

    //gestion de l'edition de la donnée
    push : function(req, res){
        Particulier.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix}, "$push": { dim:  req.body._id }  },{new: true}, function (err, data){
            if (err){
                console.log(err);
                res.render("../views/phones/edit",{data:req.body} );
            } 
            res.redirect("/phones/show/" + data._id);
            
        });
    }
};