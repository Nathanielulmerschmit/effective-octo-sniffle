var {Database} = require('../models/database.js');

exports.shuttle_times_get =  (req, res) => {
    var result = Database.simpleQuery()
    res.send(result[0]);
    //res.send(Database.route(req.params.id, req.params.id_2));
    //res.send(req.params.id + ' ' + req.params.id_2 + ' ' + req.params.id_3);
}

exports.shuttle_example =  function (req, res) {
    let row;
    Database.query('Select * from East where stopLoc = \'DeglmanCircle\'').then( (times) => {
        res.send('Here is a time ' + times[0])
        Database.close()
        }, err => { Database.close().then( () => { throw err;})}
    ).catch( err => { console.log(err);})

}

module.exports = exports;

