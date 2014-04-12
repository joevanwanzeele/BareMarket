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

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    companyName: {
      type: 'string'
    },

    userName: {
      type: 'string',
      required: true,
    },

  	email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    address: {
      type: 'string',
      required: true
    },

    city: {
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      required: true
    },

    zip: {
      type: 'string',
      required: true
    },

    country: {
      type: 'string',
      required: true
    },

    phoneNumber: {
      type: 'string'
    },

    online: {
      type: 'boolean',
      defaultsTo: false
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    encryptedPassword: {
      type: 'string'
    }
  },

  beforeValidation: function(values, next){
    
    if (typeof values.admin !== 'undefined'){
      if (values.admin === 'unchecked'){
        values.admin = false;
      }
      else if (values.admin[1] === 'on'){
        values.admin = true;
      }
    }
    next();
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
