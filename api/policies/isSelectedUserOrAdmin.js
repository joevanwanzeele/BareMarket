/**
 * canEditProfile
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var sessionUserMatchesId = req.session.User && req.session.User.id === req.param('id');
  var isAdmin = req.session.User && req.session.User.admin;

  if (!(sessionUserMatchesId || isAdmin)) {
    var noRightsError = [{name: 'noRights', message: 'You are not authorized to perform this action.'}];
    req.session.flash = { err: noRightsError };
    res.redirect('/session/new');
    return;
  }

  next();
  
};
