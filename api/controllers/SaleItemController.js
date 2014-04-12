/**
 * SaleItemController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  new: function(req, res){
    res.view();
  },

  index: function(req, res){
    SaleItem.find(function foundItems (err, items) {

      if (err) return next(err);

      res.view({
        items: items
      });
    });
  },

  create: function(req, res, next){

    var saleItemObj = {
      postedByUserId: req.session.User.id,
      postedDate: new Date(),
      title: req.param('title'),
      description: req.param('description'),
      price: req.param('price'),
      quantity: req.param('quantity'),
      category: req.param('category'),
      subCategory: req.param('subCategory')
    }

    SaleItem.create(saleItemObj, function itemCreated(err, item){

      if (err) {
        req.session.flash = { err: err };

        return res.redirect('/user/new');
      }

      item.save(function(err, item){
        if (err) return next(err);

        SaleItem.publishCreate(item);

        res.redirect('/saleitem/show/'+item.id);
      });
    });
  },

  update: function(req, res, next){
    return next();
  },

  show: function(req, res, next){

      SaleItem.findOne(req.param('id'), function foundItem (err, item) {

        if (err) return next(err);

        if (!item) return next();

        res.view({
          item: item
        });

      });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SaleItemController)
   */
  _config: {}


};
