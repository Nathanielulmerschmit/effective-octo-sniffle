var { Database } = require("../models/database.js");
var {
  getDepartTime,
  getArrivalTime,
  isShuttleOperational,
} = require("../models/time.js");

const weekday = new Array(7);
weekday[0] = "sun";
weekday[1] = "mon";
weekday[2] = "tue";
weekday[3] = "wed";
weekday[4] = "thu";
weekday[5] = "fri";
weekday[6] = "sat";

exports.shuttle_times_scheduled_get = (req, res) => {
  var scheduledTime = String(req.params.id_4);
  console.log(typeof scheduledTime);
  var scheduledHours = Number(scheduledTime.substring(0, 2));
  var scheduledMin = Number(scheduledTime.substring(3, 5));
  var date = new Date();
  console.log(date.getDay());
  var day = weekday[date.getDay()];
  date.setHours(scheduledHours);
  date.setMinutes(scheduledMin);
  console.log(date.getTime());
  let time1arr = [];
  let time2arr = [];
  let statusTimesArr = [];
  let departArray = [];
  let arrivalArray = [];
  let finalArray = [];
  Database.queryStatus(
    `Select ${day}Start, ${day}End, main1Start, main1End, main2Start, main2End from Routes where routeName = \'${req.params.id}\'`,
    day
  )
    .then((statusTimes) => {
      console.log(statusTimes.toString());
      statusTimesArr.push(statusTimes[0]);
      statusTimesArr.push(statusTimes[1]);
      statusTimesArr.push(statusTimes[2]);
      statusTimesArr.push(statusTimes[3]);
      statusTimesArr.push(statusTimes[4]);
      statusTimesArr.push(statusTimes[5]);
      console.log(statusTimesArr[2]);

      return Database.query(
        `Select * from ${req.params.id} where stopLoc = \'${req.params.id_2}\'`
      );
    })
    .then((times) => {
      //console.log(times[0]);
      //console.log(times[1]);

      time1arr.push(times[0]);
      time1arr.push(times[1]);
      time1arr.push(times[2]);
      console.log(time1arr[0]);
      console.log(times[2]);

      return Database.query(
        `Select * from ${req.params.id} where stopLoc = \'${req.params.id_3}\'`
      );
    })
    .then(
      (times2) => {
        //console.log(times2[0]);
        time2arr.push(times2[0]);
        time2arr.push(times2[1]);
        time2arr.push(times2[2]);
      },
      (err) => {
        Database.close().then(() => {
          console.log(err);
        });
      }
    )
    .then(() => {
      departArray = getDepartTime(date, time1arr);
      arrivalArray = getArrivalTime(departArray, time2arr);
      console.log(departArray[1]);
      console.log(arrivalArray[1]);

      finalArray.push(departArray[0]);
      finalArray.push(departArray[1]);
      finalArray.push(arrivalArray[1]);
      finalArray.push(departArray[2]);
      finalArray.push(arrivalArray[2]);

      statusBoolArr = isShuttleOperational(finalArray, statusTimesArr);

      normalOpTimesArr = getNormalTime(statusTimesArr);

      finalArray.push(statusBoolArr[0]);
      finalArray.push(statusBoolArr[1]);
      finalArray.push(statusBoolArr[2]);
      finalArray.push(statusBoolArr[3]);
      finalArray.push(normalOpTimesArr[0]);
      finalArray.push(normalOpTimesArr[1]);
      finalArray.push(normalOpTimesArr[2]);
      finalArray.push(normalOpTimesArr[3]);
      finalArray.push(normalOpTimesArr[4]);
      finalArray.push(normalOpTimesArr[5]);

      res.send(
        JSON.stringify({
          departTime: finalArray[1],
          arrTime: finalArray[2],
          departTime2: finalArray[3],
          arrTime2: finalArray[4],
          closedBool: finalArray[5],
          breakBool: finalArray[6],
          closedBool2: finalArray[7],
          breakBool2: finalArray[8],
          openTime: finalArray[9],
          closeTime: finalArray[10],
          break1StartTime: finalArray[11],
          break1EndTime: finalArray[12],
          break2StartTime: finalArray[13],
          break2EndTime: finalArray[14],
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

function getNormalTime(times) {
  var currHour;
  var currMin;
  var retArr = [];
  for (var i = 0; i < times.length; i++) {
    if (times[i] == null) {
        retArr.push(null);
    } else {
      currHour = parseInt(times[i].slice(0, 2));
      currMin = parseInt(times[i].slice(3));
      if (currHour > 12) {
        currHour -= 12;
        if (currMin < 10) {
          retArr.push(currHour + ":0" + currMin + " PM");
        } else {
          retArr.push(currHour + ":" + currMin + " PM");
        }
      } else {
        if (currMin < 10) {
          retArr.push(currHour + ":0" + currMin + " AM");
        } else {
          retArr.push(currHour + ":" + currMin + " AM");
        }
      }
    }
  }

  return retArr;
}

exports.shuttle_times_get = function (req, res) {
  var date = new Date();
  console.log(date.getDay());
  var day = weekday[date.getDay()];
  let time1arr = [];
  let time2arr = [];
  let statusTimesArr = [];
  let departArray = [];
  let arrivalArray = [];
  let finalArray = [];
  Database.queryStatus(
    `Select ${day}Start, ${day}End, main1Start, main1End, main2Start, main2End from Routes where routeName = \'${req.params.id}\'`,
    day
  )
    .then((statusTimes) => {
      console.log(statusTimes.toString());
      statusTimesArr.push(statusTimes[0]);
      statusTimesArr.push(statusTimes[1]);
      statusTimesArr.push(statusTimes[2]);
      statusTimesArr.push(statusTimes[3]);
      statusTimesArr.push(statusTimes[4]);
      statusTimesArr.push(statusTimes[5]);
      console.log(statusTimesArr[2]);

      return Database.query(
        `Select * from ${req.params.id} where stopLoc = \'${req.params.id_2}\'`
      );
    })
    .then((times) => {
      console.log(times[0]);
      console.log(times[1]);

      time1arr.push(times[0]);
      time1arr.push(times[1]);
      time1arr.push(times[2]);
      console.log(time1arr[0]);
      console.log(times[2]);

      return Database.query(
        `Select * from ${req.params.id} where stopLoc = \'${req.params.id_3}\'`
      );
    })
    .then(
      (times2) => {
        console.log(times2[0]);
        time2arr.push(times2[0]);
        time2arr.push(times2[1]);
        time2arr.push(times2[2]);
        //return Database.close();
      },
      (err) => {
        Database.close().then(() => {
          console.log(err);
        });
      }
    )
    .then(() => {
      departArray = getDepartTime(date, time1arr);
      arrivalArray = getArrivalTime(departArray, time2arr);
      finalArray.push(departArray[0]);
      finalArray.push(departArray[1]);
      finalArray.push(arrivalArray[1]);
      finalArray.push(departArray[2]);
      finalArray.push(arrivalArray[2]);

      console.log(departArray[2]);
      console.log(arrivalArray[2]);

      statusBoolArr = isShuttleOperational(finalArray, statusTimesArr);

      normalOpTimesArr = getNormalTime(statusTimesArr);

      finalArray.push(statusBoolArr[0]);
      finalArray.push(statusBoolArr[1]);
      finalArray.push(statusBoolArr[2]);
      finalArray.push(statusBoolArr[3]);
      finalArray.push(normalOpTimesArr[0]);
      finalArray.push(normalOpTimesArr[1]);
      finalArray.push(normalOpTimesArr[2]);
      finalArray.push(normalOpTimesArr[3]);
      finalArray.push(normalOpTimesArr[4]);
      finalArray.push(normalOpTimesArr[5]);

      res.send(
        JSON.stringify({
          departTime: finalArray[1],
          arrTime: finalArray[2],
          departTime2: finalArray[3],
          arrTime2: finalArray[4],
          closedBool: finalArray[5],
          breakBool: finalArray[6],
          closedBool2: finalArray[7],
          breakBool2: finalArray[8],
          openTime: finalArray[9],
          closeTime: finalArray[10],
          break1StartTime: finalArray[11],
          break1EndTime: finalArray[12],
          break2StartTime: finalArray[13],
          break2EndTime: finalArray[14],
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = exports;
