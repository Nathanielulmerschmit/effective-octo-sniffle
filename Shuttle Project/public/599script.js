function getFormInfo() {
    const start = document.getElementById("routeStart").value;
    const end = document.getElementById("routeEnd").value;
    const route = document.getElementById("txtList").value;
    let timeArray = [0, 15, 30]; //timeArray will be changed to the database array
    let arriveTime = new Date();
    let hours = arriveTime.getHours();
    let nextHour = hours + 1;
    let minutes = arriveTime.getMinutes();
    let leaveTime = "";
    
    var formInfo = [start, end, route];

    processFormInfo(formInfo);
    
    outputTime(hours, nextHour, minutes, timeArray, leaveTime);
}

function processFormInfo(formInfo){
    document.writeln('<p>Your departure stop is ' + formInfo[0] + '. Your destination is ' + formInfo[1] +
	'. You chose the ' + formInfo[2] + ' </p>');  
}


function outputTime(hours, nextHour, minutes, timeArray, leaveTime){
    const originalHours = hours;
   
    if(hours > 12){
        hours = hours - 12;
        nextHour = nextHour - 12;
    }

    hours.toString();
    nextHour.toString();

    
    if (minutes < timeArray[0] && timeArray[0] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[0].toString();
    }
    else if (minutes < timeArray[1] && timeArray[1] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[1].toString();
    }
    else if (minutes < timeArray[2] && timeArray[2] - minutes >= 5){
        leaveTime = hours + ":" + timeArray[2].toString();
    }
    else if (minutes >= timeArray[2] && ((timeArray[0]+ 60)- minutes >= 5)) {
        leaveTime = nextHour + ":0" + timeArray[0].toString();
    }
    else {
        if (timeArray[1] >= 10){
            leaveTime = nextHour + ":" + timeArray[1].toString();
        }
        else{
            leaveTime = nextHour + ":0" + timeArray[1].toString();
        }
    }
    
    if (originalHours > 12){ 
        document.writeln('<p> Your departure time is ' + leaveTime + ' PM please do not be late. </p>');
    }

    else{
        document.writeln('<p> Your departure time is ' + leaveTime + ' AM please do not be late. </p>');
    }

}