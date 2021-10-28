require

function getFormInfo(){
    const start = document.getElementById("routeStart").value;
    const end = document.getElementById("routeEnd").value;
    const route = document.getElementById("txtList").value;
    let time = document.getElementById("arriveTime").value;
    
    var formInfo = [start, end, route, time];
    processFormInfo(formInfo);
}

function processFormInfo(formInfo){
    document.writeln('<p>Your departure stop is ' + formInfo[0] + '. Your destination is ' + formInfo[1] +
	'. You chose the ' + formInfo[2] + ' route at '+ formInfo[3] +' </p>');  
}