var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    response = require('../../expand_models/response');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:path.normalize('./public/uploadfile')});

router.post("/upload.do",multipartMiddleware,function(req,res){
    var filepath = req.files.file.path;
    var serverPath = filepath.replace("public",'/').replace(/\\/g,"/");
    console.info(serverPath);
    res.json(response.create(response.STATUS.SUCCESS,{path:serverPath},"上传成功"));
});

module.exports = router;