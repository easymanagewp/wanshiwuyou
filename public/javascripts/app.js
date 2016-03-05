var base_path = base_path==undefined?"/":base_path;
requirejs.config({
    baseUrl: base_path=="/"?"/":base_path+"/",
    paths : {
        jquery : "bower_components/jquery/dist/jquery",
        form : 'javascripts/lib/form',
        http : 'javascripts/lib/requirejs-http',
        utils : 'javascripts/lib/requirejs-utils',
        window : 'javascripts/lib/window',
        md5 : 'javascripts/lib/requirejs-md5',
        css : 'javascripts/lib/requirejs-css',
        'jquery.validate' : 'bower_components/jquery.validate/jquery.validate',
        'jquery.validate.zh' : 'bower_components/jquery.validate/localization/messages_zh',
        'jquery.ajaxfileupload' : 'javascripts/lib/jquery.ajaxfileupload',
        'image-upload' : 'javascripts/lib/image-upload',
        'location' : 'javascripts/lib/location',
        'arttemplate' : 'bower_components/artTemplate/dist/template',
        'jquery.pager' : 'javascripts/lib/jquery.pager',
        'data-grid' : 'javascripts/lib/datagrid',
        'dataform' : 'javascripts/lib/dataform',
        'data-grid-plugin-del' : 'javascripts/lib/datagrid-plugin-del',
        'data-grid-plugin-checkbox' : 'javascripts/lib/datagrid-plugin-checkall',
        'jquery.mousewheel' : 'javascripts/lib/jquery.mousewheel',
        'jquery.mCustomScrollbar' : 'javascripts/lib/jquery.mCustomScrollbar',
        'lib_user' : 'javascripts/business/lib_user',
        'lib_business_type' : 'javascripts/business/lib_business_type',
        '$$global' : 'javascripts/lib/global',
        '$$Cookie' : 'javascripts/lib/require-cookie',
        '$$SocketIo' : '/socket.io/socket.io',
        '$$Socket' : 'javascripts/lib/Socket',
        $$Login : 'javascripts/lib/requirejs-login',
        '$$Noty' : 'bower_components/noty/js/noty/packaged/jquery.noty.packaged',
        '$$tip' : 'bower_components/tipsy/src/javascripts/jquery.tipsy',
        '$$dialog' : 'bower_components/artDialog/dist/dialog',
        'json3' : 'bower_components/json3/lib/json3'
    },
    shim : {
        jquery: {
            exports: '$'
        },
        $$SocketIo : {
            deps : ['json3']
        },
        'jquery.validate': {
            deps: ['jquery', 'css!stylesheets/jquery.validate.css'],
            exports: '$.fn.validate'
        },
        'jquery.ajaxfileupload': {
            deps: ['jquery'],
            exports: '$.fn.ajaxfileupload'
        },
        'jquery.validate.zh': ['jquery.validate'],
        'jquery.pager': {
            deps: ['jquery', 'css!javascripts/lib/jquery.pager.css'],
            exports: '$.fn.pager'
        },
        'arttemplate': {
            exports: 'template'
        },
        'jquery.mCustomScrollbar': {
            deps: ['jquery', 'jquery.mousewheel', 'css!javascripts/lib/jquery.mCustomScrollbar.css']
        },
        '$$tip' : {
            exports : '$.fn.tipsy',
            deps: ['css!bower_components/tipsy/src/stylesheets/tipsy.css']
        },
        '$$dialog' : {
            exports : 'dialog',
            deps:['css!bower_components/artDialog/css/ui-dialog.css']
        }
    }
});


var to_login = function(url){
    var encodeUrl = encodeURIComponent(url);
    window.location.href = base_path+"/login.html?redirecturl="+encodeUrl;
};