var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
  
/**
 * Création du modèle pour la base de données pour la collections "voitures"
 */
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    droit: {
        type: Number,
        required: true
    }
  });

//hashing du mot de passe a&vant de l'enregistrer dans la base de donnée
// UserSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash){
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     })
//   });

var User = mongoose.model('users', UserSchema);

module.exports = User;