var $$TongZhiDao = require('../../dao/tongZhi'),
    response = require('../../expand_models/response');

module.exports = function (req, res, next) {

    var id = req.params.id;

    $$TongZhiDao.updateAsync({_id: id}, {$set: {isRead: true}}, {}).then(function () {
        res.json(response.create(response.STATUS.SUCCESS, {}, "状态更新成功"));
    }).catch(function () {
        res.json(response.create(response.STATUS.FAIL, {}, "获取更新失败"));
    });
};