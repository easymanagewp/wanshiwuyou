define(function(require,exports,module){
   exports.exports = function(name,obj){
       window[name] = obj;
   }
});