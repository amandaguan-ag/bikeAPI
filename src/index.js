import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BikeService from "./bike-service.js";

function getStolenBike(color, location) {
  let promise = BikeService.getStolenBikes(color, location);
  promise.then(
    function (bikeDataArray) {
      printElements(bikeDataArray);
    },
    function (errorArray) {
      printError(errorArray);
    }
  );
}

function printElements(data) {
  const response = data[0];
  const color = data[1];
  const location = data[2];
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

function printError(error) {
  document.querySelector(
    "#showResponse"
  ).innerHTML = `<p>There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}</p>`;
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
