const shuttleurl = 'localhost:4000/shuttle'
const start = document.getElementById("routeStart").value;
const destBox = document.getElementById("routeEnd").value;
const routebox = document.getElementById("txtList").value;
const submit = document.getElementById('submit')

const getTimes = () => {
    const depart = start.value;
    const dest = destBox.value;
    const route = routebox.value;

    const endpoint = `${shuttleurl}/route/${route}/depart/${depart}/dest/${dest}`

    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          renderWordResponse(xhr.response);
        }
      };
      xhr.open('GET', endpoint);
      xhr.send();
}

function renderWordResponse(xhr) {

    if(!res){
        console.log(res.status);
    }
    // In case res comes back as a blank array
    if(!res.length){
    responseField.innerHTML = "<p>Try again!</p><p>Something went wrong!</p>";
    return;
    }

    responseField.innerHTML = `<text>${JSON.stringify(xhr)}</text>`;
    return;

}

// clear previous results and display results to webpage
const displayTimes = (event) => {
    event.preventDefault();
    while(responseField.firstChild){
      responseField.removeChild(responseField.firstChild);
    };
    getTimes();
  };

  submit.addEventListener('click', displaySuggestions);