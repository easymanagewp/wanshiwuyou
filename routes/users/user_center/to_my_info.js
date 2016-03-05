module.exports = function(req, res, next) {
    res.render('users/user_center/my_info', {session:req.session,module:'my' });
};