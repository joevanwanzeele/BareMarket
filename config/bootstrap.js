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

  //import categories... probably not necessary on each deploy.
  //make this a seperate process

  var lineReader = require('line-reader');
  cb();
  // console.log("--clearing old categories--\n");
  //
  // Category.destroy({}).done(function(err){
  //   if (err) { console.log(err); }
  //   console.log("--cleared old categories--\n");
  //   importCategories();
  // });
  //
  // function importCategories(){
  //   console.log("--Begin importing categories--\n");
  //
  //   lineReader.eachLine('./assets/taxonomy.en-US.txt', function(line, last){
  //     if (line.indexOf('Google_Product_Taxonomy_Version') == -1)
  //     {
  //       var obj = { categoryList: line.split(' > ') };
  //       Category.create(obj, function(err, category){
  //         if (err) {console.log(err);}
  //         if (last){
  //           console.log("--Loaded categories--\n");
  //           cb();
  //         }
  //       });
  //     }
  //   });
  //}
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

}
