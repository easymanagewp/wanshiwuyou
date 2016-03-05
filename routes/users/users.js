var express = require('express');
var router = express.Router();


/* 推广中的用户列表 */
router.get('/user/extension_user.do',require('./extension_user_list'));

/* 登录 */
router.get('/login.html',require('./login/to_login'));
router.get("/logout.do",require('./login/logout'));
router.post('/login.do',require('./login/login'));
router.get('/login/validate.do',require('./login/validate_login'))
router.get('/captcha.do',require('./login/captcha'))

/* 注册 */
router.get('/register_1.html',require('./register/to_register_step1'));
router.get('/register_2.html',require('./register/to_register_step2'));
router.get('/register_3.html',require('./register/to_register_step3'));
router.post('/register_1.do',require('./register/post_register_step1'));
router.post('/register_2.do',require('./register/post_register_step2'));
router.post('/register_3.do',require('./register/post_register_step3'));

/* 个人中心 */
router.get('/user_center/base_info.html',require('./user_center/to_base_info'));
router.get('/user_center/business_info.html',require('./user_center/to_business_info'));
router.get('/user_center/my_info.html',require('./user_center/to_my_info'));
router.get('/user_center/reset_pwd.html',require('./user_center/to_reset_pwd'));

router.put('/user_center/base_info.do',require('./user_center/put_base_info'));
router.put('/user_center/business_info.do',require('./user_center/put_business_info'));
router.put('/user_center/my_info.do',require('./user_center/put_my_info'));
router.put('/user_center/reset_pwd.do',require('./user_center/put_reset_pwd'));

/* 用户信息 */
router.get('/user/:user_id.do',require('./get_user_info'));


module.exports = router;
