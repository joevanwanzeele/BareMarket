/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any user designated as an admin
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.User && req.session.User.admin) {
    return next();
  }
  var requireAdminError = [{name: 'requireAdminError', message: 'You must be an administrator to perform this action.'}];
  req.session.flash = {err: requireAdminError };

  res.redirect('/session/new');
  return;

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
