// initiation
let id_show = 0;
let data_show = [];

// submit form
const submitForm = (e) => {
  e.preventDefault();

  // reset data
  id_show = 0;
  data_show = [];
  // reset form
  document.getElementById("detail-country").style.display = "none";
  document.getElementById("list-country").innerHTML = null;

  // get value from input-country
  let input_search = document.getElementById("country").value.toLowerCase();

  // get data from api and save data in data_show
  getData(input_search);
};

// jquery - submit form
document
  .getElementById("search-form-box")
  .addEventListener("submit", submitForm);

// get data from fetch
const getData = (search) => {
  fetch(`https://restcountries.eu/rest/v2/name/${search}`)
    .then((res) => res.json())
    .then((data) => {
      data_show = data;
      // show list data - brief country
      document.getElementById("list-country").innerHTML = list_brief_country(
        data_show
      );
    })
    .catch((error) => {
      console.log("ERROR");
      document.getElementById("list-country").innerHTML = null;
      alert("Can not find your search, try again with new search");
    });
};

// show brief country - form left
const list_brief_country = (data) => {
  const data_show = data
    .map((element, id) => {
      const show_brief_country = `
      <div class="country-brief-box">
        <span> ${element.alpha3Code} </span>
        <button type="button" class="country" onclick="showThisCountry(${id})">
          ${element.name}
        </button>
      </div>
    `;
      id++;
      return show_brief_country;
    })
    .join("");
  return data_show;
};

// open form right when click an item from form left
const showThisCountry = (id) => {
  // reset background of the previous object
  document.getElementById("list-country").children[id_show].style.background =
    "#fff";
  // declare new id of the selected object
  id_show = id;
  // set background of the selected object
  document.getElementById("list-country").children[id_show].style.background =
    "rgb(220, 255, 255)";
  //show form-right
  document.getElementById("detail-country").style.display = "flex";
  document.getElementById("detail-country").innerHTML = list_detail_country(
    data_show[id_show]
  );
};

// show detail country - form right
const list_detail_country = (data) => {
  const data_show = `
    <img src="${data.flag}" alt="image-flag"/>
    <div class="content-box">
      <span class="bold">Native name:</span>&nbsp;${data.nativeName}
    </div>
    <div class="content-box">
      <span class="bold">Capital:</span>&nbsp;${data.capital}
    </div>
    <div class="content-box">
      <span class="bold">Population:</span>&nbsp;${data.population}
    </div>
    <div class="content-box">
      <span class="bold">Languages:</span>
      <p>${data.languages
        .map((language) => {
          return language.name;
        })
        .join(", ")}</p>
    </div>
    <div class="content-box">
      <span class="bold">Time zones:</span>
      <p>${data.timezones
        .map((timezone) => {
          return timezone;
        })
        .join(", ")}</p>
    </div>
    <div class="content-box">
      <span class="bold">Currencies name:</span>
      <p>${data.currencies
        .map((currency) => {
          return `${currency.name} (${currency.symbol})`;
        })
        .join(", ")}</p>
    </div>
    <div class="content-box">
      <span class="bold">Name of border countries:</span>
      <p>${data.borders
        .map((border) => {
          return border;
        })
        .join(", ")}</p>
    </div>
  `;
  return data_show;
};
