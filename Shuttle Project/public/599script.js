function getFormInfo() {
    //the info the user inputs.
    const start = document.getElementById("routeStart").value;
    const end = document.getElementById("routeEnd").value;
    const route = document.getElementById("txtList").value;
    var formInfo = [start, end, route];
    
    //the array of times retreived from the database. 
    //timeArray will be changed to the database array.
    let timeArray = [0, 15, 30];
    
    //current time variables.
    let arriveTime = new Date();
    let hours = arriveTime.getHours();
    let nextHour = hours + 1;
    let minutes = arriveTime.getMinutes();
    
    //the time the shuttle leaves.
    let leaveTime = "";
    
    processFormInfo(formInfo);
    
    outputTime(hours, nextHour, minutes, timeArray, leaveTime);
}

function processFormInfo(formInfo){
    //prints the info sent to the database
    document.writeln('<p>Your departure stop is ' + formInfo[0] + '. Your destination is ' + formInfo[1] +
	'. You chose the ' + formInfo[2] + ' route.' + ' </p>');  
}


function outputTime(hours, nextHour, minutes, timeArray, leaveTime){
    //does the calculations for what time to output.
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