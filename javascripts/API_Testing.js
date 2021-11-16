function submitData(){
    var data = document.getElementById('textInput').value;
    this.searchData = data;
    fetch_REQUEST()
}

const API_REQUEST_HEADER = {
    api_key : 'njjHWcSbPgo2Gnuf8mXE0sXIkFLa5QtcqMYI48fN',
    query: this.searchData,
    dataType: ["Survey (FNDDS)"],
    pagesize: 5,
}    

function fetch_REQUEST(){
    console.log(encodeURIComponent(this.searchData));
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(this.searchData)}&pageSize=${encodeURIComponent(API_REQUEST_HEADER.pagesize)}&api_key=${encodeURIComponent(API_REQUEST_HEADER.api_key)}`    ,{
        method: 'GET',
        headers: {'Content-type': 'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(json => {
        var cell1 = document.getElementById('foodName')
        var cell2 = document.getElementById('nutstat')
        var cell3 = document.getElementById('valuestat')

        
        cell1.innerHTML = json.foods[0].description
        cell2.innerHTML = json.foods[0].foodNutrients[0].nutrientName 
        cell3.innerHTML = json.foods[0].foodNutrients[0].value + "gr"

        console.log(json)
    })
    .then(err => console.log('Request FAILED', err))
}

function success() {
    var data = JSON.parse(this.responseText)
    //console.log(data);
}

function error(err) {
    console.log('Request Failed', err);
}
/* function GET_REQUEST(query){
    var xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET','https://api.nal.usda.gov/fdc/v1/foods/search?query=pear&pageSize=2&api_key=aXHiaXbVSNFWNePoG9eaWe1PsHs8EiCxZKeUoDJG')
    xhr.send();
} */