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

var AWS = require('aws-sdk');
var crypto = require('crypto');
var uuid = require('node-uuid');


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
      subCategory: req.param('subCategory'),
      imageUrl: req.param('imageUrl')
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

  sign_s3: function(req, res){
    var aws_config = sails.config.aws;
    var AWS_ACCESS_KEY = aws_config.key;
    var AWS_SECRET_KEY = aws_config.secret;
    var S3_BUCKET = aws_config.s3Bucket;
    //var object_name = req.query.s3_object_name; //set this to include the listing id, or use a guid
    var object_name = uuid.v4();
    var mime_type = req.query.s3_object_type;

    var now = new Date();
    var expires = Math.ceil((now.getTime() + 60000)/1000); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";

    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

    var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
    signature = encodeURIComponent(signature.trim());
    signature = signature.replace('%2B','+');

    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

    var credentials = {
        signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
        url: url
    };
    res.write(JSON.stringify(credentials));
    res.end();
  },

  uploadImage: function(req, res, next){
    var s3bucket = new AWS.S3({params: {Bucket: 'baremarket-image-test'}});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SaleItemController)
   */
  _config: {}


};
