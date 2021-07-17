//https://restcountries.eu/rest/v2/name/{name}

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
const getCountryData = function(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
request.send();
request.addEventListener('load', function(){
  //console.log(this.responseText);
const [data] = JSON.parse(this.responseText);
  //console.log(data.name);
renderCountry(data);
const [neighbour] = data.borders;
console.log(neighbour);


const request2 = new XMLHttpRequest();
request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
request2.send();
if(!neighbour) return;
request2.addEventListener('load', function(){
  console.log(this.responseText);
  const data2 = JSON.parse(this.responseText);
  //console.log(data.name);
 renderCountry(data2, 'neighbour');
})
});
}
getCountryData('nepal');
/*getCountryData('russia');
getCountryData('spain');
getCountryData('argentina');*/


