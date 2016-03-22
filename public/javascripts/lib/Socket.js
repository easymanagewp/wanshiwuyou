define(function(require,exports,module){
    var $$SocketIO = require('$$SocketIo');
    var $$Cookie = require('$$Cookie');

    var $$Socket = null;
    if(!$$Socket){
        $$Socket = $$SocketIO();
    }
    var $UserToken = $$Cookie.get('user_token');
    if($UserToken) {
        $$Socket.emit('init');
    }

    module.exports = $$Socket;
});