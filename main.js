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
  if (document.getElementById("detail-country")) {
    document.getElementById("detail-country").remove();
  }
  document.getElementById("list-country").innerHTML = null;

  // get value from input-country
  let input_search = document.getElementById("country").value.toLowerCase();

  // get data from api and save data in data_show
  getData(input_search);
};

// submit form
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
        <span class="alpha3code"> ${element.alpha3Code} </span>
        <button type="button" class="country" onclick="showThisCountry(${id},event)">
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
const showThisCountry = (id, e) => {
  e.preventDefault();
  // remove form right of the previous object
  if (document.getElementById("detail-country")) {
    document.getElementById("detail-country").remove();
  }
  // reset background of the previous object
  document.getElementById("list-country").children[id_show].style.background =
    "#fff";

  // declare id of the new selected object
  id_show = id;
  // set background of the new selected object
  document.getElementById("list-country").children[id_show].style.background =
    "rgb(220, 255, 255)";

  // create the new form-right
  let newFormRight = document.createElement("div");
  newFormRight.className = "detail-country";
  newFormRight.id = "detail-country";
  if (document.body.clientWidth < 750) {
    // mobile
    document
      .getElementById("list-country")
      .children[id_show].appendChild(newFormRight);
  } else {
    // desktop
    document.getElementById("content-show").appendChild(newFormRight);
  }

  document.getElementById("detail-country").innerHTML = list_detail_country(
    data_show[id_show],
    id_show
  );
};

// show detail country - form right
const list_detail_country = (data, id) => {
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
    <div class="close-form">
      <button class="button-close" type="button" onclick="close_form_right(${id},event)"=>Close</button>
    </div>
  `;
  return data_show;
};

// function close form right
const close_form_right = (id, e) => {
  e.preventDefault();

  // reset background of the object of this id
  document.getElementById("list-country").children[id].style.background =
    "#fff";
  // remove form right of the object of this id
  if (document.getElementById("detail-country")) {
    document.getElementById("detail-country").remove();
  }
};
