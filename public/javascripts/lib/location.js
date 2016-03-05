define(function(require,exports,module){
	var W = require('window');
	
	var href = W.location.href;
	
	var hrefArr = href.split('#');
	
	var params = {};
	var searchHrefArr = hrefArr[0].split('?');
	if(searchHrefArr.length > 1){
		var searchHrefParams = decodeURI(searchHrefArr[1]);
		var searchHhrefParamsArr = searchHrefParams.split('&');
		for(var iIndex=0;iIndex<searchHhrefParamsArr.length;iIndex++){
			var _paramItem = searchHhrefParamsArr[iIndex].split("=");
			params[_paramItem[0]] = _paramItem[1];
		}
	}
	
	var location = W.location;
	
	location.params = params;
	location.url = hrefArr[0].split('?')[0];
	module.exports = location;
});