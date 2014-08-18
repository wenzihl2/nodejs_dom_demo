var ws = require("nodejs-websocket");
console.log("开始建立连接...")
var IP="172.19.9.90";

var game1 = null,game2 = [] , game1Ready = false , game2Ready = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str+"连接数"+game2.length)
        if(str==="game1"){
            game1 = conn;
            console.log(game1);
            game1Ready = true;
            conn.sendText("success");
        }
        if(str==="game2"){
            game2.push(conn);
            game2Ready = true;
        }
        if(game1Ready&&game2Ready){
            str+="连接数"+game2.length;
            game1.sendText(str);
            for(i=0;i<game2.length;i++){

                game2[i].sendText(str);

            }

        }

        //conn.sendText(str)
    });
    conn.on("close", function (code, reason) {
        for(i=0;i<game2.length;i++){
            if(game2[i]==conn){
                game2.splice(i,1);
            }


        }
        console.log("关闭连接 代码 "+code);

    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭 代码 "+code)
    });
}).listen(8001, IP);
console.log("WebSocket建立完毕");