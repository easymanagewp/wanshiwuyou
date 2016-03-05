var $$Promise = require('bluebird');
var $$SolrClient =  require('solr-client');

var $ClientConfig = {
    host : 'images.wan451.com',
    port : 80,
    core : 'user',
    path : '/solr'
};

var $UserSolrClient = module.exports = $$Promise.promisifyAll($$SolrClient.createClient($ClientConfig));



/* var $$UserDao = require('../dao/user');
$$UserDao.find({},function(err,docs){
    console.info(docs);
    $UserSolrClient.add(docs,function(err,obj){
        if(err){
            console.info(err);
        }else{
            console.info(obj);
        }
    });
});*/

/* 查询
var $Query = $UserSolrClient.createQuery().q('广告');
$UserSolrClient.search($Query,function(err,obj){
    if(err){
        console.info(err);
    }else{
        console.info(obj.response);
    }
});

$UserSolrClient.deleteByID('565c0ef1119bdc9c26c26a7b',function(err,obj){
   if(err){
       console.info(err);
   }else{
       console.info(obj);
   }
    $UserSolrClient.commit(function(err2,obj2){
        console.info(err2);
        console.info(obj2);
    })
});*/