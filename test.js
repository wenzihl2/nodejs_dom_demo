var http = require('http');
var mime = require("./mime").types;
var fs = require('fs');
var sys = require('sys')
var path = require('path')
var url =require('url')
var data=require('./data');
html=data.html;
var a="  zw  ";
var sql = require('mssql');
var config = {
    user: 'sa',
    password: '123456',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'datacenter_new',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
var chathtml=fs.readFileSync(__dirname + '/socket_chat.html', 'UTF-8');

function test(res,sqllist){
    res.write("test");
}


http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(__dirname , uri);



        if (req.url == '/') {
            res.writeHead(200, { "Content-Type": "text/html" });
            data.func_demo(filename);
        res.write(html);

            var connection = new sql.Connection(config, function(err) {
                // ... error checks
// Query
                var request = connection.request(connection); // or: var request = connection.request();
                request.query('select * from T_BASICDATA', function(err, recordset) {
                    var testeval= recordset[0];
                    res.write("<script>  var ab="+testeval.basic_no+ ";" +
                        "" +
                        "</script>");


                    for (var i=0;i<recordset.length;i++)
                    {
                        sqlgj=recordset[i].basic_no;
                        test(res,recordset);
                        res.write(sqlgj.toString());
                        res.write(recordset[i].basic_value);
                        res.write("<br>")
                    }
                    // ... error checks
                    sqlgj=recordset[1].basic_type;
                    console.log(recordset[80].basic_type);

                    res.write(sqlgj.toString())
                    res.write("end");
                    res.end()
                });

// Stored Procedure

                // var request = new sql.Request(connection);
                //request.input('input_parameter', sql.Int, 10);
                //request.output('output_parameter', sql.VarChar(50));
                //request.execute('procedure_name', function(err, recordsets, returnValue) {
                // ... error checks

                //  console.dir(recordsets);
                //});
            });
        }
    if (req.url == '/1') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(chathtml);
        res.end()
    }
    if (req.url == '/ajax') {


    }
}).listen(808, "172.19.9.90");
console.log('Server running at http://172.19.9.90/');

