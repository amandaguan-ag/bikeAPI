import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BikeService from "./bike-service.js";

function getStolenBike(color, location) {
  //   let promise = BikeService.getStolenBikes(color, location);
  BikeService.getStolenBikes(color, location).then(function (response) {
    if (response.main) {
      printElements(response, color, location);
    } else {
      printError(response, color, location);
    }
  });
  //   promise.then(
  // function (bikeDataArray) {
  //   printElements(bikeDataArray);
  // },
  // function (errorArray) {
  //   printError(errorArray);
  // }
  //   );
}

function printElements(response, color, location) {
  //   const response = data[0];
  //   const color = data[1];
  //   const location = data[2];
  const bikes = response.bikes;
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
  console.log(error);
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
  getStolenBike(color, city);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
