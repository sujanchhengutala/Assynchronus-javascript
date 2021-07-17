'use strict'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;
//console.log(window);

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition((position) =>{
  //console.log(position);
  //console.log(position.coords);
  const {latitude, longitude} = position.coords;
  console.log(latitude, longitude);
  const coord = [latitude, longitude];
  console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

  map = L.map('map').setView(coord, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    //console.dir(map);
    //there is 'on' event for mouse inside prototype chain
    map.on('click', (mapEvents)=>{
      mapEvent = mapEvents;
      //console.log(mapEvent);
      form.classList.remove('hidden');
      inputDistance && inputDuration.focus();
      //inputDuration.focus();
    })
}, ()=> {
  console.log('Can not access your coordinates');
}) 
}
form.addEventListener('submit', (e)=>{
  e.preventDefault();
inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

  const {lat, lng} = mapEvent.latlng;
  console.log(lat, lng);
  L.marker([lat, lng]).addTo(map)
  .bindPopup(L.popup( { maxWidth : 300, minWidth : 150, autoClose : false, closeOnClick : false, className: 'running-popup'  } ) ).setPopupContent(`This is marked point`)
  .openPopup();
})
inputType.addEventListener('change', ()=>{
inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})
