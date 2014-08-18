var express = require('express');
var fs = require('fs');
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
var indexhtml=fs.readFileSync(__dirname + '/static/test.html', 'UTF-8');
var app = express();
app.use(express.static('static'));
app.get('/', function(req, res){
    res.write(indexhtml);
    res.end();
});
app.get('/ajax',function(req, res){
    res.write(req.query.id+req.query.id+req.query.id+req.query.id);

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
// Query
        var request = connection.request(connection); // or: var request = connection.request();
        request.query('select * from T_BASICDATA', function(err, recordset) {

            for (var i=0;i<recordset.length;i++)
            {
                sqlgj=recordset[i].basic_no;

                res.write(sqlgj.toString());
                res.write(recordset[i].basic_value);
                res.write("<br>")
            }
            // ... error checks

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

});
app.listen(3000);