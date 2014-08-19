$(document).ready(function(){

    header.innerHTML='<button onclick="toindex()">主页</button><button onclick="toabout()">关于</button><button onclick="tochart()">聊天室</button><button onclick="toajax()">获得ajax</button><button onclick="tologin()">登录</button><button onclick="toabout()">关于</button><button onclick="toindex()">主页</button><button onclick="toabout()">关于</button><button onclick="toindex()">主页</button><button onclick="toabout()">关于</button>';
    footer.innerHTML='<div style="text-align: center;">this is footer</div>';
    document.getElementById('content').style.minHeight=(window.innerHeight-100).toString()+'px';
    $(window).resize(function() {
        content.style.minHeight=(window.innerHeight-100).toString()+'px';
    });
});


function toindex(){
   // $(function() {$("#content").empty();});
    content.innerHTML='<div id="content1">content1</div><div id="content2">content2</div>'
}
function toabout(){
    content.innerHTML='<div id="tabs"><ul> <li><a href="#tabs-1">Nunc tincidunt</a></li><li><a href="#tabs-2">Proin dolor</a></li> <li><a href="#tabs-3">Aenean lacinia</a></li>    </ul>    <div id="tabs-1">        <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>    </div>    <div id="tabs-2">        <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>        </div>    <div id="tabs-3">        <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>        <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>    </div>    </div>' +
        '<div id="draggable" class="ui-widget-content" style="position: fixed;width: 80%;height: 100px;margin: 0px auto;left: 0;right: 0;">Drag me around</div>' +
        '<div id="dialog" title="Basic dialog">        <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p>    </div>'
    $(function() {
        $( "#tabs" ).tabs();
    });
    $(function() {
        $( "#draggable" ).draggable();
        $( "#dialog" ).dialog();
    });
}
var ws;
function tochart(){
    content.innerHTML='<div id="messdom" class="test_box" style="height:100%;background-color:#255;position: relative; overflow-y: auto;">正在连接...</div>    <div style="width: 100%;height: 50px;background-color: #224;box-shadow:14px 11px 27px #888; bottom: 0px;position:relative;">        <div id="text_area"  contenteditable="true" style="float:left;width: 80%;min-height: 100%;background-color: #74b359;"  ></div>        <div class="send" style="float: left;height: 100%;width:20%">发送</div>    </div>';

    var mess = document.getElementById("messdom");
    function a(){console.log(text);}
    var text="success";

    var text_area=document.getElementById("text_area");
    if(window.WebSocket){
        ws = new WebSocket('ws://172.19.9.90:8001');
        document.querySelector(".send").onclick = function(){
            var time = new Date();
            console.log(ws.readyState);
            msg=time+"user："+text_area.innerHTML;
            ws.send(msg);
            console.log(msg);

        };
        ws.onopen = function(e){
            console.log("连接服务器成功");
            ws.send("user");
            mess.innerHTML ="连接成功";
        };
        ws.onclose = function(e){
            console.log("服务器关闭");
            //ws.send("index1服务器关闭");  不能响应
        };
        ws.onerror = function(){
            console.log("连接出错");
        };
        ws.onmessage = function(e){

            mess.innerHTML +="<div class='messchild'    onclick='a()' >"+"消息："+e.data+"<br>"+"</div>";
            mess.scrollTop=mess.scrollHeight;
        }
    }
}

function toajax(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            content.innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","/ajax?id=10",true);
    xmlhttp.send();


}
function tologin(){
    content.innerHTML='<form action="/ajax" method="get"> <input type="text" name="id"/><input type="submit" value="Sign In" /></form>'
}