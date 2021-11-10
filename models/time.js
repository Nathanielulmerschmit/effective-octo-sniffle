exports.getDepartTime =  (date, timeArray) => {
    let hours = date.getHours();
    let nextHour = hours + 1;
    let minutes = date.getMinutes();
    let leaveTime = "";
    let departHour;
    let departMinute;
    const originalHours = hours;
    const returnArray = [];
   
    if(hours > 12){
        hours = hours - 12;
        nextHour = nextHour - 12;
    }

    hours.toString();
    nextHour.toString();

    
    if (minutes < timeArray[0] && timeArray[0] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[0];
        departHour = hours;
        departMinute = timeArray[0];
    }
    else if (minutes < timeArray[1] && timeArray[1] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[1];
        departHour = hours;
        departMinute = timeArray[1];
    }
    else if (minutes < timeArray[2] && timeArray[2] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[2];
        departHour = hours;
        departMinute = timeArray[2];
    }
    else if (minutes >= timeArray[2] && ((timeArray[0]+ 60)- minutes >= 5)) {
        leaveTime = nextHour + ":0" + timeArray[0];
        departHour = hours;
        departMinute = timeArray[0];
    }
    else {
        if (timeArray[1] >= 10){
            leaveTime = nextHour + ":" + timeArray[1];
            departHour = hours;
            departMinute = timeArray[1];
        }
        else{
            leaveTime = nextHour + ":0" + timeArray[1];
            departHour = hours;
            departMinute = timeArray[1];
        }
    }
    
    returnArray.push(originalHours);

    if (originalHours > 12){ 
        returnArray.push(`${leaveTime} PM`);
    }

    else{
        returnArray.push(`${leaveTime} AM`);
    }
    returnArray.push(originalHours);
    returnArray.push(departMinute);

    return returnArray;
}

exports.getArrivalTime =  (departArray, timeArray) => {
    let hours = departArray[2];
    let nextHour = hours + 1;
    let minutes = departArray[3];
    let leaveTime = "";
    let departHour;
    let departMinute;
    const originalHours = hours;
    const returnArray = [];
   
    if(hours > 12){
        hours = hours - 12;
        nextHour = nextHour - 12;
    }

    hours.toString();
    nextHour.toString();

    
    if (minutes < timeArray[0] ){
        leaveTime = hours + ":" + timeArray[0];
        departHour = hours;
        departMinute = timeArray[0];
    }
    else if (minutes < timeArray[1]){
        leaveTime = hours + ":" + timeArray[1];
        departHour = hours;
        departMinute = timeArray[1];
    }
    else if (minutes < timeArray[2]){
        leaveTime = hours + ":" + timeArray[2];
        departHour = hours;
        departMinute = timeArray[2];
    }
    else {
        leaveTime = nextHour + ":0" + timeArray[0];
        departHour = nextHour;
        departMinute = timeArray[0];
    }
    
    returnArray.push(originalHours);

    if (originalHours > 12){ 
        returnArray.push(`${leaveTime} PM`);
    }

    else{
        returnArray.push(`${leaveTime} AM`);
    }
    returnArray.push(departHour);
    returnArray.push(departMinute);

    return returnArray;
}

module.exports = exports;