var Database = require('../models/database');

exports.shuttle_times_get = (req, res) => {
    //res.send(Database.simpleQuery(req.params.id, req.params.id_2));
    res.send(req.params.id + req.params.id_2);
}

module.exports = exports;