var {Database} = require('../models/database.js');
var {getDepartTime, getArrivalTime} = require('../models/time.js')

exports.shuttle_times_get =  function (req, res) {
    var date = new Date();
    let time1 = [];
    let time2 = [];
    let departArray;
    let arrivalArray;
    let finalArray;
    Database.query(`Select * from ${req.params.id} where stopLoc = \'${req.params.id_2}\'`).then( (times) =>
    {
        console.log(times[0]);
        console.log(times[1]);
        
        time1.push(times[0]);
        time1.push(times[1]);
        time1.push(times[2]);
        console.log(time1[0]);
        console.log(times[2]);
        return Database.query(`Select * from ${req.params.id} where stopLoc = \'${req.params.id_3}\'`);
    }
    ).then( times2 => {
        console.log(times2[0]);
        time2.push(times2[0]);
        time2.push(times2[1]);
        time2.push(times2[2]);
        return Database.close();
        }, err => { Database.close().then( () => { console.log(err);})}
    ).then(() => {
        departArray = getDepartTime(date, time1);
        arrivalArray = getArrivalTime(departArray, time2);
        console.log(departArray[1]);
        console.log(arrivalArray[1])
        finalArray.push(departArray[1]);
        finalArray.push(arrivalArray[1]);
        res.send(JSON.stringify(finalArray.toString()));
    }
    ).catch( err => { console.log(err);})

}

module.exports = exports;

