var ws = require("nodejs-websocket");
console.log("开始建立连接...");
var IP="172.19.9.90";

var users = [] , game1Ready = false , usersReady = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str+"连接数"+users.length);
        strtemp=str;
        if (strtemp=="user")
        {
            users.push(conn);
        }

        else{
            for(i=0;i<users.length;i++){
                users[i].sendText(strtemp);
            }
        }









        //str+="连接数"+users.length;


        

        //conn.sendText(str)
    });
    conn.on("close", function (code, reason) {
        for(i=0;i<users.length;i++){
            if(users[i]==conn){
                users.splice(i,1);
            }
        }
        console.log("关闭连接 代码 "+code);
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭 代码 "+code)
    });
}).listen(8001, IP);
console.log("WebSocket建立完毕");