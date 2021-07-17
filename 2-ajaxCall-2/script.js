'use strict'
//https://restcountries.eu/rest/v2/name/{name}
let post;
const renderCountry = function(data, className =''){
  const html = `<article class='country ${className}'>
   <img class="country__img" src="${data.flag}" />
    <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
       <h4 class="country__region">${data.region}</h4>
         <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
                ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${2}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>                                                                                      
`;
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity =1;

}
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const getCountryData = function(country)
{
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//console.log(fetch(`https://restcountries.eu/rest/v2/name/nepal`));
/*.then(function(sujan){                                                                  //function vitra j name rakhda ni hunxa
  //console.log(sujan);
  return sujan.json();
 // console.log(sujan.json());
})
.then(function(data){                                                                   //function vitra j name rakhda ni hunxa
//console.log(data)
renderCountry(data[0]);
}).then(function (data){
  
})
}*/
//In simple form
  .then((response) =>                                                                 
  response.json())
  .then((data) => {                                                         
   renderCountry(data[0]);
   const neighbour = data[0].borders[1];
   if (!neighbour) return;
  return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
})
.then((response) => response.json())
.then((data) => renderCountry(data, 'neighbour'));
}
getCountryData('nepal');

