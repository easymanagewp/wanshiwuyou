var $$Utils = require('../expand_models/utils');
    assert = require('assert');

assert.equal($$Utils.strIsBlank(null),true,"blank null");
assert.equal($$Utils.strIsBlank(""),true,"blank emtpy");
assert.equal($$Utils.strIsBlank("  "),true,'blank emtpy 2');
assert.equal($$Utils.strIsBlank("1"),false,'blank 1');

assert.equal($$Utils.strIsNotBlank(null),false,'notBlank null');
assert.equal($$Utils.strIsNotBlank(""),false,'notBlank empty');
assert.equal($$Utils.strIsNotBlank("  "),false,'not Blank empty 2');
assert.equal($$Utils.strIsNotBlank("1"),true,'not Blank 1');

console.log('[UtilsTestCase] ok !!!');