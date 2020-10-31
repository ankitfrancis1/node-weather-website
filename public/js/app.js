const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageZero = document.querySelector('#message-0');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.querySelector('#weather-img');

messageZero.textContent = '';
messageOne.textContent ='';
messageTwo.textContent = '';
weatherImg.src ='';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageZero.textContent= "Loading...";
    messageOne.textContent= '';
    messageTwo.textContent= '';
    
    weatherImg.src = '';

    const address = search.value;
    fetch('/weather?address='+address).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
            messageOne.textContent = data.error;
        else {
            messageZero.textContent = data.location;
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.weather_detail;
            weatherImg.src = data.weather_icon;
        }
    })
    .catch((err)=>{
        console.log(err);
    });
});
})