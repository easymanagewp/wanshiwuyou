/* 数据库配置 */
var $$Promise = require('bluebird');
var mongoose = $$Promise.promisifyAll(require('mongoose'));
//120.27.103.105
var db = mongoose.createConnection('mongodb://120.27.103.105:27017/test');

// 链接错误
db.on('error', function(error) {
    console.log(error);
});

exports.mongoose = mongoose;
exports.db = db;


