var div2= require('./div2.js');
var div1 = ' div1 ';
var body = 'this  is body'+div1 +div2.div2+'<img  width="100%" src="http://172.19.9.90:8080/img.jpg">'+div2.div2;
exports.html='<!DOCTYPE html>' +
    '<html>' +
    '<head lang="en">' +
    '<meta charset="UTF-8" name="viewport" content="device-with,initial-scale=1">' +
    '<title>haha</title>' +
    '</head>' +
    '<body>';
exports.func_demo=function(a){
    console.log("func_demofunction"+div1+a)
};






