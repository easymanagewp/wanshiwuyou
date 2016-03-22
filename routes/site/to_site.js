var siteDao = require('../../dao/site');

module.exports = {
    about : function(req,res){
        siteDao.findAsync().then(function(sites){
            res.render('site/about',{site:sites[0]});
        })
    },
    help : function(req,res){
        siteDao.findAsync().then(function(sites) {
            res.render('site/help',{site:sites[0]});
        });
    },
    useMethod : function(req,res){
        siteDao.findAsync().then(function(sites) {
            res.render('site/useMethod',{site:sites[0]});
        })
    },
    cooperation : function(req,res){
        siteDao.findAsync().then(function(sites) {
            res.render('site/cooperation',{site:sites[0]});
        })
    }
};