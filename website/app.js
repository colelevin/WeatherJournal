/* Global Variables */

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

const generateElement = document.querySelector('#generate');

const urlBase = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const countryCode = 'us';
const key = '6ec37aaca207783669c2a4bd08051aff';
let newZipCode = '95014';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// event listener to generate on click
generateElement.addEventListener('click', function () {
  performAction();
})


function performAction(e){
  const content = document.querySelector('#feelings').value;
  const zipInput = document.querySelector('#zip').value;
  if (zipInput != '') newZipCode = zipInput;

  getWeather(urlBase, newZipCode, countryCode, key)
  .then(function(data) {
    postData('/add', {date: newDate, temp: data.main.temp, content: content});
    updateUI();
  })
}


const getWeather = async (base, zip, country, key) =>{
  const url = `${base}${zip},${country}&appid=${key}`;
  const res = await fetch(url);

  try{
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log('error', error);
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    const lastIndex = allData.length - 1;
    document.querySelector('#date').innerHTML = allData[lastIndex].date;
    document.querySelector('#temp').innerHTML = allData[lastIndex].temp;
    document.querySelector('#content').innerHTML = allData[lastIndex].content;

  }catch(error){
    console.log("error", error);
  }
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
