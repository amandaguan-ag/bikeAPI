import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BikeService from "./bike-service.js";

// function getStolenBike(color, location) {//update the name of this function
function getAPIData(color, location) {
  BikeService.getStolenBikes(color, location).then(function (response) {
    if (response.bikes) {
      printBike(response, color, location);
    } else {
      printError(response.error, color, location);
    }
  });
}

// function printElements(response, color, location) {//// the parameter has changed for this function, as
function printBike(response, color, location) {
  let bikes = response.bikes;
  const list = document.createElement("ul");
  bikes.forEach((bike) => {
    const item = document.createElement("li");
    item.innerText = bike.title;
    list.appendChild(item);
  });
  const responseDiv = document.querySelector("#showresponse");
  responseDiv.innerHTML = "";
  const heading = document.createElement("p");
  heading.innerText = `The ${color} bikes stolen in ${location} are:`;
  responseDiv.appendChild(heading);
  responseDiv.appendChild(list);
}

function printError(error, color, location) {
  document.querySelector(
    "#showresponse"
  ).innerHTML = `<p>There was an error accessing the ${color} stolen bike data for ${location}: 
  ${error}.</p>`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const color = document.querySelector("#color").value;
  const city = document.querySelector("#location").value;
  document.querySelector("#color").value = null;
  document.querySelector("#location").value = null;
  getAPIData(color, city);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
