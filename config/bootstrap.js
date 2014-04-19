/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.bootstrap = function (cb) {

  User.update({},{
    online: false
  },
  function userUpdated(err, users){
      if (err) { console.log(err); }
      else {}
  });

  //import categories

  var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

  var instream = fs.createReadStream('./assets/taxonomy.en-US.txt');
  var outstream = new stream;
  outstream.readable = true;
  outstream.writable = true;

  var rl = readline.createInterface({
      input: instream,
      output: outstream,
      terminal: false
  });

  rl.on('line', function(line) {
      //console.log(line);
      if (line.indexOf('Google_Product_Taxonomy_Version') == -1)
      {
        var obj = { categoryList: line.split(' > ') };
        Category.create(obj, function categoryCreated(err, category){
          console.log(err);
        });
        console.dir(obj.categoryList);
      }


  });

  cb();

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

};
