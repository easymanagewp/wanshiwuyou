/**
 * Created by wangpeng on 16/3/6.
 */

var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');
var socket = require('../routes/socket');

var tongzhi_schema = datasource.mongoose.Schema({
    userId : datasource.mongoose.Schema.Types.ObjectId,
    content : String,
    isRead : {type : Boolean,default:!1}
});

var tongzhi_model = datasource.db.model("tongZhi",tongzhi_schema);

var tongzhiDao = $.extend(new base_dao(tongzhi_model,tongzhi_schema),{
    send : function(msg,user){
        var inthis = this;
        return this.saveAsync({content:msg,isRead : false,userId:user}).then(function(entity){
            console.log(entity);
            if(socket.$SendTZ(entity)){
                inthis.updateAsync({_id:entity._id},{$set:{isRead:true}},{}).catch(function(){
                })
            }
        })
    }
});


module.exports = tongzhiDao;



