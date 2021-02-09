import { data } from "./data";

const submitForm = (e) => {
  e.preventDefault();
  console.log("test submit");
};

document
  .getElementById("search-form-box")
  .addEventListener("submit", submitForm);

let list_country = data.map((element) => {
  return <div>{element.name}</div>;
});

document.getElementById("test").innerHTML = list_country;

console.log(data);
