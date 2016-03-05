var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('node-uuid');
var utils = require('./expand_models/utils');
var $$MapCache = require('./expand_models/MapCache');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid : function(){
    return uuid.v4();
  },
  name:'sessionid',
  secret : "keyboard cat"
}));

// ע��session | request �������
app.use(function(req,res,next){
  var _render = res.render;
  res.render = function(view, options, callback) {
    if(!options){
      options = {};
    }
    var user_token = req.cookies.user_token;
    var session = utils.extend(req.session,$$MapCache.$GetCacheScope(user_token));
    options['session'] =session;
    options['req'] = {
      params : req.params,
      query : req.query,
      body : req.body
    }
    options["config"] = {
      project:{
        name:"万事无忧"
      }
    }
    _render.call(res, view, options, callback);
  };
  next();
});

app.use('/',require('LoginInterceptor')({
  $NotInterceptUrl : [
    '/',
    '/index.html',
    '/login.html',
    '/register_1.html',
    '/register_2.html',
    '/register_3.html',
    '/feedback.html',
    '/notice/detail.html'
  ],
  $IsLogin : function(req,res){
    /* 1：验证token */
    var _UserToken = req.cookies['user_token'];
    if(null == _UserToken || ''== _UserToken){
      return false;
    }

    /* 2：验证token真实性 */
    var _CacheStore = $$MapCache.$GetCacheScope(_UserToken);
    if(null == _UserToken || null == {}){
      return false;
    }

    /* 3：验证用户信息是否存在 */
    var _UserInfo = $$MapCache.$GetCache(_UserToken,'userInfo');
    if(null==_UserInfo){
      return false;
    }

    return true;
  },
  $OnNotLogin : function(req,res){
    res.render('no_login',{redirectUrl:req.originalUrl});
  }
}));

// 后台登录拦截
app.use('/admin',function(req,res,next){
    var account_token = req.cookies.account_token;
    if(req.originalUrl.indexOf(".html")!=-1){
      if(req.originalUrl.indexOf("login.html")!=-1){
        next();
      }else{
        if(null == account_token) {
          res.redirect('/admin/login.html');
          return;
        }
      }
    }
    next();
});

/* 路由设置 */
var routes = require('./routes/routes');
for(var key in routes){
  var _routes =  routes[key];
  for(var iIndex=0;iIndex<_routes.length;iIndex++){
    app.use(key,_routes[iIndex]);
  }
}

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  console.info(err);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
