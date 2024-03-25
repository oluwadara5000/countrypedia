// Global variable
const countriesList = document.getElementById("countries")
let countries;

// Event Listener
// countriesList.addEventListener("change", event => displayCountryInfo(event.target.value))
countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("data.json")
  .then(res => res.json())
  .then(data => initialize(data))
  .catch(err => console.log("Error:" + err))

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  // for (let i = 0; i < countries.length; i++){
  //   options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
  //   // options += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
  // } 

  countries.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`);
  countriesList.innerHTML = options;
  // console.log(countriesList)
  // console.log(countriesList.value);
  // console.log(countriesList.length);
  // console.log(countriesList.selectedIndex);
  // console.log(countriesList[200].value);
  // console.log(countriesList[200].text);
  countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

// USE CHAT GPT TO FIGURE OUT HOW TO DISPLAY THE BORDERS FOR EACH COUNTRY USING THIER ALP=HA3CODE

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("demonym").innerHTML = countryData.demonym;
  document.getElementById("currency").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("sub-region").innerHTML = countryData.subregion;
  document.getElementById("borders").innerHTML = countryData.borders.map(b => `${b[0].text}`);
};
