var sql = require('mssql');

var config = {
    user: 'sa',
    password: '123456',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'test',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }



}

var connection = new sql.Connection(config, function(err) {
    // ... error checks

// Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('select* from A', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });

// Stored Procedure

    var request = new sql.Request(connection);
    request.input('input_parameter', sql.Int, 10);
    request.output('output_parameter', sql.VarChar(50));
    request.execute('procedure_name', function(err, recordsets, returnValue) {
        // ... error checks

        console.dir(recordsets);
    });



});
