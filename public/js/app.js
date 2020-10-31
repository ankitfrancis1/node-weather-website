console.log("Client Side javascript is running");

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent ='',
messageTwo.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent= "Loading...";
    messageTwo.textContent= '';
    const address = search.value;
    fetch('http://localhost:4000/weather?address='+address).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
            messageOne.textContent = data.error;
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
    .catch((err)=>{
        console.log(err);
    });
});
})