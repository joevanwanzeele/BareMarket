/**
 * SaleItem
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

schema: true,

attributes: {

  postedById: {
    type: 'string',
    required: true
  },

  title: {
    type: 'string',
    required: true
  },

  description: {
    type: 'string',
    required: true
  },

  currentPrice: {
    type: 'float',
    required: true
  },

  postedDate: {
    type: 'date',
    required: true
  },

  quantity: {
    type: 'int',
    required: true
  }
},


};
