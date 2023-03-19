export default class BikeService {
  static getStolenBikes(color, location) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&colors=${color}&location=${location}&stolenness=proximity`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, color, location]);
        } else {
          reject([this, response, color, location]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
