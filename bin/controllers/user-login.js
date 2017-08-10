
var Db = require("../../common-lib/default-db-settings");
exports.userLogin = function (request, response) {
    var dbConfig = Db.dbSetting();
    var sql = require("mssql");
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('SELECT * FROM CustomerMaster;', function (err, rSet) {
            sql.close();
            if (err) console.log(err);
            response.send(rSet.recordset).end();
        });        
    });
};