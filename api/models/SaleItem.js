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

  postedByUserId: {
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

  price: {
    type: 'float',
    required: true
  },

  category: {
    type: 'string'
  },

  subCategory: {
    type: 'string'
  },

  postedDate: {
    type: 'date',
    required: true
  },

  quantity: {
    type: 'int',
    required: true
  },

  images: {
    type: 'array'
  },

  imageUrl: {
    type: 'string' //this is just temporary for testing.. use images later.
  }
}

};
