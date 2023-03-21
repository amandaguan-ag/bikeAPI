export default class BikeService {
  static getStolenBikes(color, location) {
    return fetch(
      `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&colors=${color}&location=${location}&stolenness=proximity`
    ).then(function (response) {
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        return response.json();
      }
    });
    // .then(function (data) {
    //   const matchingBikes = data.bikes.filter((bike) =>
    //     bike.frame_colors.includes(color)
    //   );
    //   if (matchingBikes.length > 0) {
    //     return data;
    //   } else {
    //     const errorMessage = `No bikes found with color ${color}`;
    //     throw new Error(errorMessage);
    //   }
    // })
    // .catch(function (error) {
    //   return error;
    // });
  }
}
