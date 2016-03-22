/**
 * Created by wangpeng on 16/3/6.
 */

var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var site_schema = datasource.mongoose.Schema({
    help : String,
    about : String,
    cooperation : String,
    use_method : String
});

var site_model = datasource.db.model("site",site_schema);

var siteDao = $.extend(new base_dao(site_model,site_schema),{
    // 更新Help
    updateHelp : function(id,content){
        // this.model.updateAsync(conditions,doc,options);
        return this.updateAsync({_id:id},{$set:{help:content}},{});
    },
    updateAbout : function(id,about){
        return this.updateAsync({_id:id},{$set:{about:about}},{});
    },
    updateCooperation : function(id,cooperation){
        return this.updateAsync({_id:id},{$set:{cooperation:cooperation}},{});
    },
    updateUseMethod : function(id,useMethod){
        return this.updateAsync({_id:id},{$set:{use_method:useMethod}},{});
    }
});


module.exports = siteDao;



