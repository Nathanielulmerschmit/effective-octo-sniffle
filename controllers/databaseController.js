var {Database} = require('../models/database.js');
var {getDepartTime, getArrivalTime} = require('../models/time.js')

exports.shuttle_times_scheduled_get = (req, res) => {
    var scheduledTime = String(req.params.id_4);
    console.log(typeof scheduledTime);
    var scheduledHours = Number(scheduledTime.substring(0,2));
    var scheduledMin = Number(scheduledTime.substring(3,5));
    var date = new Date();
    date.setHours(scheduledHours);
    date.setMinutes(scheduledMin);
    console.log(date.getTime());
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
        //return Database.close();
        }, err => { Database.close().then( () => { console.log(err);})}
    ).then(() => {
        departArray = getDepartTime(date, time1);
        arrivalArray = getArrivalTime(departArray, time2);
        console.log(departArray[1]);
        console.log(arrivalArray[1]);

        res.send(JSON.stringify({
            departTime: departArray[1],
            destTime: arrivalArray[1] 
        }));
    }
    ).catch( err => { console.log(err);})

}

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
        //return Database.close();
        }, err => { Database.close().then( () => { console.log(err);})}
    ).then(() => {
        departArray = getDepartTime(date, time1);
        arrivalArray = getArrivalTime(departArray, time2);
        console.log(departArray[1]);
        console.log(arrivalArray[1]);

        res.send(JSON.stringify({
            departTime: departArray[1],
            destTime: arrivalArray[1] 
        }));
    }
    ).catch( err => { console.log(err);})

}
  
module.exports = exports;

