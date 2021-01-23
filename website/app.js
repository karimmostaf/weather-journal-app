/* Global Variables */
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const key = '6b1f50fae8dab0fbdfdfe316bd6a2adc&units=metric';
const code = document.getElementById('zip');
const zipEnter = code.value;
const feeling = document.getElementById('feelings');
const content = feeling.value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

//when click button
const btn = document.getElementById('generate');
btn.addEventListener('click', performAction);
//take action after clicking
function performAction(e) {
    e.preventDefault();
    const zipEnter = code.value;
    const content = feeling.value;
    //get all data for user and uddata with it user interface
    getData(apiBaseUrl, zipEnter, key)
        .then((userData) => {
            console.log(userData)
            postData('/addWeather', { date: newDate, temp: userData.main.temp, content })
        })
        .then(() => { updateUI() });

}

// to get data from api
const getData = async(apiBaseUrl, zipEnter, key) => {
        // to fetch temp data (await the fetch)
        const url = `${apiBaseUrl}${zipEnter}&appid=${key}`;
        const res = await fetch(url)
        try {
            //to convert json data to js data
            const userData = await res.json();
            return userData;
        } catch (error) {
            console.log(error);
        }
    }
    //async post data to server
const postData = async(url = '', data = {}) => {
    //to fetch route to server  and convert js data to json data again
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
    })
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

// update UI
const updateUI = async() => {
    const req = await fetch('/all');
    try {
        //to user can see the all data in browser
        const Data = await req.json();
        document.getElementById('date').innerHTML = Data.date;
        document.getElementById('temp').innerHTML = Data.temp;
        document.getElementById('content').innerHTML = Data.content;

    } catch (error) {
        console.log(error);
    }
}