exports.isShuttleOperational = (finalArray, statusArr) => {
  var retArr = [];
  var finalArray2 = [];

  finalArray2.push(finalArray[0]);
  finalArray2.push(finalArray[3]);
  finalArray2.push(finalArray[4]);
  if (statusArr[1] === null) {
    retArr.push(true);
    retArr.push(false);
    retArr.push(true);
    retArr.push(false);
  } else {
    if (!checkShuttleClosed(finalArray, statusArr)) {
      retArr.push(true);
    } else {
      retArr.push(false);
    }
    if (!checkShuttleBreak(finalArray, statusArr)) {
      retArr.push(true);
    } else {
      retArr.push(false);
    }
    if (!checkShuttleClosed(finalArray2, statusArr)) {
      retArr.push(true);
    } else {
      retArr.push(false);
    }
    if (!checkShuttleBreak(finalArray2, statusArr)) {
      retArr.push(true);
    } else {
      retArr.push(false);
    }
  }
  return retArr;
};

function checkShuttleBreak(finalArray, statusArr) {
  const originalHours = parseInt(finalArray[0]);
  var departHour = parseInt(finalArray[1].slice(0, 2));
  var departMinute = parseInt(finalArray[1].slice(3));
  var arrivalHour = parseInt(finalArray[2].slice(0, 2));
  var arrivalMinute = parseInt(finalArray[2].slice(3));

  const break1StartHour = parseInt(statusArr[2].slice(0, 2));
  const break1StartMinute = parseInt(statusArr[2].slice(3));
  const break1EndHour = parseInt(statusArr[3].slice(0, 2));
  const break1EndMinute = parseInt(statusArr[3].slice(3));
  const break2StartHour = parseInt(statusArr[4].slice(0, 2));
  const break2StartMinute = parseInt(statusArr[4].slice(3));
  const break2EndHour = parseInt(statusArr[5].slice(0, 2));
  const break2EndMinute = parseInt(statusArr[5].slice(3));

  if (originalHours > 12) {
    departHour += 12;
    arrivalHour += 12;
  }

  departDate = new Date();
  departDate.setHours(departHour);
  departDate.setMinutes(departMinute);

  arrivalDate = new Date();
  arrivalDate.setHours(arrivalHour);
  arrivalDate.setMinutes(arrivalMinute);

  break1StartDate = new Date();
  break1StartDate.setHours(break1StartHour);
  break1StartDate.setMinutes(break1StartMinute);

  break1EndDate = new Date();
  break1EndDate.setHours(break1EndHour);
  break1EndDate.setMinutes(break1EndMinute);

  break2StartDate = new Date();
  break2StartDate.setHours(break2StartHour);
  break2StartDate.setMinutes(break2StartMinute);

  break2EndDate = new Date();
  break2EndDate.setHours(break2EndHour);
  break2EndDate.setMinutes(break2EndMinute);

  if (departDate >= break1StartDate && departDate < break1EndDate) {
    return false;
  } else if (arrivalDate > break1StartDate && arrivalDate <= break1EndDate) {
    return false;
  }

  if (departDate >= break2StartDate && departDate < break2EndDate) {
    return false;
  } else if (arrivalDate > break2StartDate && arrivalDate <= break2EndDate) {
    return false;
  }
  return true;
}

function checkShuttleClosed(finalArray, statusArr) {
  const originalHours = parseInt(finalArray[0]);
  var departHour = parseInt(finalArray[1].slice(0, 2));
  var departMinute = parseInt(finalArray[1].slice(3));
  var arrivalHour = parseInt(finalArray[2].slice(0, 2));
  var arrivalMinute = parseInt(finalArray[2].slice(3));

  const startHour = parseInt(statusArr[0].slice(0, 2));
  const startMinute = parseInt(statusArr[0].slice(3));
  const endHour = parseInt(statusArr[1].slice(0, 2));
  const endMinute = parseInt(statusArr[1].slice(3));

  if (originalHours > 12) {
    departHour += 12;
    arrivalHour += 12;
  }

  departDate = new Date();
  departDate.setHours(departHour);
  departDate.setMinutes(departMinute);

  arrivalDate = new Date();
  arrivalDate.setHours(arrivalHour);
  arrivalDate.setMinutes(arrivalMinute);

  startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);

  endDate = new Date();
  endDate.setHours(endHour);
  endDate.setMinutes(endMinute);

  if (departDate <= startDate || departDate > endDate) {
    return false;
  } else if (arrivalDate > endDate) {
    return false;
  }
  return true;
}


exports.getDepartTime = (date, timeArray) => {

  let hours = date.getHours();
  let nextHour = hours + 1;
  let minutes = date.getMinutes();
  let leaveTime = "";
  let leaveTime2 = "";
  let departHour;
  let departMinute;
  let departHour2;
  let departMinute2;

  const originalHours = hours;
  const returnArray = [];

  if (hours > 12) {
    hours = hours - 12;
    nextHour = nextHour - 12;
  }

  if (minutes < timeArray[0] && timeArray[0] - minutes >= 5) {
    if (timeArray[0] < 10) {
      leaveTime = hours + ":0" + timeArray[0];
    } else {
      leaveTime = hours + ":" + timeArray[0];
    }

    if (timeArray[1] < 10) {
      leaveTime2 = hours + ":0" + timeArray[1];
    } else {
      leaveTime2 = hours + ":" + timeArray[1];
    }
    departHour = hours;
    departMinute = timeArray[0];

    departHour2 = hours;
    departMinute2 = timeArray[1];
  } else if (minutes < timeArray[1]) {
    if (timeArray[1] < 10) {
      leaveTime = hours + ":0" + timeArray[1];
    } else {
      leaveTime = hours + ":" + timeArray[1];
    }
    if (timeArray[2] !== null) {
      if (timeArray[2] < 10) {
        leaveTime2 = hours + ":0" + timeArray[2];
      } else {
        leaveTime2 = hours + ":" + timeArray[2];
      }
    } else {
      if (timeArray[0] < 10) {
        leaveTime2 = nextHour + ":0" + timeArray[0];
      } else {
        leaveTime2 = nextHour + ":" + timeArray[0];
      }
    }

    departHour = hours;
    departMinute = timeArray[1];

    departHour2 = hours;
    departMinute2 = timeArray[2];
  } else if (minutes < timeArray[2]) {
    if (timeArray[2] < 10) {
      leaveTime = hours + ":0" + timeArray[2];
    } else {
      leaveTime = hours + ":" + timeArray[2];
    }

    if (timeArray[0] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[0];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[0];
    }

    departHour = hours;
    departMinute = timeArray[2];

    departHour2 = nextHour;
    departMinute2 = timeArray[0];
  } else if (minutes >= timeArray[2]) {
    if (timeArray[0] < 10) {
      leaveTime = nextHour + ":0" + timeArray[0];
    } else {
      leaveTime = nextHour + ":" + timeArray[0];
    }

    if (timeArray[1] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[1];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[1];
    }

    departHour = nextHour;
    departMinute = timeArray[0];

    departHour2 = nextHour;
    departMinute2 = timeArray[1];
  } else {
    if (timeArray[1] >= 10) {
      leaveTime = nextHour + ":" + timeArray[1];
    } else {
      leaveTime = nextHour + ":0" + timeArray[1];
    }

    if (timeArray[1] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[2];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[2];
    }

    departHour = nextHour;
    departMinute = timeArray[1];

    epartHour2 = nextHour;
    departMinute2 = timeArray[2];
  }

  returnArray.push(originalHours);

  if (originalHours > 12) {
    returnArray.push(`${leaveTime} PM`);
  } else {
    returnArray.push(`${leaveTime} AM`);
  }

  if (originalHours > 12) {
    returnArray.push(`${leaveTime2} PM`);
  } else {
    returnArray.push(`${leaveTime2} AM`);
  }

  returnArray.push(departHour);
  returnArray.push(departMinute);
  returnArray.push(departHour2);
  returnArray.push(departMinute2);

  return returnArray;
};

exports.getArrivalTime = (departArray, timeArray) => {
  let originalHours = departArray[0];
  let hours = departArray[3];
  let nextHour = hours + 1;
  let minutes = departArray[4];
  console.log(departArray);
  console.log(timeArray);
  console.log(minutes);
  let leaveTime = "";
  let leaveTime2 = "";
  let departHour;
  let departMinute;
  let departHour2;
  let departMinute2;
  const returnArray = [];


  if (minutes < timeArray[0]) {
    if (timeArray[0] < 10) {
      leaveTime = hours + ":0" + timeArray[0];
    } else {
      leaveTime = hours + ":" + timeArray[0];
    }
    if (timeArray[1] < 10) {
      leaveTime2 = hours + ":0" + timeArray[1];
    } else {
      leaveTime2 = hours + ":" + timeArray[1];
    }
    departHour = hours;
    departMinute = timeArray[0];

    departHour2 = hours;
    departMinute2 = timeArray[1];
  } else if (minutes < timeArray[1]) {
    if (timeArray[1] < 10) {
      leaveTime = hours + ":0" + timeArray[1];
    } else {
      leaveTime = hours + ":" + timeArray[1];
    }
    if (timeArray[2] !== null) {
      if (timeArray[2] < 10) {
        leaveTime2 = hours + ":0" + timeArray[2];
      } else {
        leaveTime2 = hours + ":" + timeArray[2];
      }
    } 
    else {
      if (timeArray[0] < 10) {
        leaveTime2 = nextHour + ":0" + timeArray[0];
      } else {
        leaveTime2 = nextHour + ":" + timeArray[0];
      }
    }

    departHour = hours;
    departMinute = timeArray[1];

    departHour2 = hours;
    departMinute2 = timeArray[2];
  } else if (minutes < timeArray[2]) {
    if (timeArray[2] < 10) {
      leaveTime = hours + ":0" + timeArray[2];
    } else {
      leaveTime = hours + ":" + timeArray[2];
    }
    if (timeArray[0] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[0];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[0];
    }

    departHour = hours;
    departMinute = timeArray[2];

    departHour2 = nextHour;
    departMinute2 = timeArray[0];
  } else if (minutes >= timeArray[2]) {
    if (timeArray[0] >= 10) {
      leaveTime = nextHour + ":" + timeArray[0];
    } else {
      leaveTime = nextHour + ":0" + timeArray[0];
    }
    if (timeArray[1] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[1];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[1];
    }

    departHour = nextHour;
    departMinute = timeArray[0];

    departHour2 = nextHour;
    departMinute2 = timeArray[1];
  } else {
    if (timeArray[1] >= 10) {
      leaveTime = nextHour + ":" + timeArray[1];
    } else {
      leaveTime = nextHour + ":0" + timeArray[1];
    }
    if (timeArray[2] < 10) {
      leaveTime2 = nextHour + ":0" + timeArray[2];
    } else {
      leaveTime2 = nextHour + ":" + timeArray[2];
    }

    departHour = nextHour;
    departMinute = timeArray[1];

    departHour2 = nextHour;
    departMinute2 = timeArray[2];
  }

  returnArray.push(originalHours);

  if (originalHours > 12) {
    returnArray.push(`${leaveTime} PM`);
    returnArray.push(`${leaveTime2} PM`);
  } else {
    returnArray.push(`${leaveTime} AM`);
    returnArray.push(`${leaveTime2} AM`);
  }
  returnArray.push(departHour);
  returnArray.push(departMinute);
  returnArray.push(departHour2);
  returnArray.push(departMinute2);

  return returnArray;
};

module.exports = exports;
