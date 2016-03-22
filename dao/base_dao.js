/*
BaseDAO 提供通用的数据交互接口
*/


var base_dao = function(model,schema){
	this.model = model;
	this.schema = schema;
};



/* 保存 */
base_dao.prototype.save = function(doc,success,err){
	var entity = new this.model(doc);
	entity.save(function(error){
		 if(error) {
            err(error);
        } else {
        	success(entity);
        }
	});
};

base_dao.prototype.saveAsync = function(doc){
	var entity = new this.model(doc);
	return entity.saveAsync();
}

/* 查询全部 */
base_dao.prototype.find = function(){
	this.model.find.apply(this.model,arguments);
};

base_dao.prototype.findAsync = function(){
	return this.model.findAsync.apply(this.model,arguments);
};

base_dao.prototype.findById = function(id,callback){
	this.model.findAsync({_id:id}).then(function(docs){
		callback(null,docs[0]);
	}).catch(function(err){
		callback(err,null);
	});
};

base_dao.prototype.findByIdAsync = function(id){
	return this.model.findAsync({_id:id});
}

/* 分页 */
base_dao.prototype.page = function(find_info,start_page,page_size,callback){
	var inthis = this;
	var result = {
		pagenumber : 1,
		pagecount : 1,
		rowcount : 0,
		rows : []
	};
	inthis.model.countAsync(find_info).then(function(count){
		result.rowcount = count;
		if(count%page_size>0){
			result.pagecount = count / page_size + 1;
		} else{
			result.pagecount = count/page_size;
		}
		if(start_page > result.pagecount){
			start_page = result.pagecount;
		}

		if(start_page <1){
			start_page = 1;
		}
		result.pagenumber = start_page;
	}).then(function(){
		inthis.model.find(find_info).limit(page_size).skip((start_page-1)*page_size).execAsync().then(function(docs){
			result.rows = docs;
			callback(null,result);
		}).catch(function(err){
			callback(err,null);
		})
	}).catch(function(err){
		callback(err,null);
	});
}

/* 删除 */
base_dao.prototype.deleteById = function(del_ids,callback){
	this.model.remove({_id:del_ids},callback);
}

base_dao.prototype.deleteByIdAsync = function(del_ids){
	return this.model.removeAsync({_id:del_ids});
};

/* 更新 */
base_dao.prototype.update = function(conditions, doc, options, callback){
	this.model.update(conditions, doc, options, callback);
}

base_dao.prototype.updateAsync = function(conditions, doc, options){
	return this.model.updateAsync(conditions,doc,options);
}

base_dao.prototype.countAsync = function(conditions){
	return this.model.countAsync(conditions);
}

module.exports = base_dao;