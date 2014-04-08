/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string'
    },

  	email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    encryptedPassword: {
      type: 'string'
    },

    // toJSON: function(){
    //     var obj = this.toObject();
    //     delete obj.password;
    //     delete obj.confirmation;
    //     delete obj._csrf;
    //     return obj;
    // }
  },
  beforeCreate: function(values, next){

    if (!values.password || values.password != values.confirmation){
      return next({err: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};
