const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e29a0fe05006951d5ec2fd2bb25aec94&query=${latitude},${longitude}`;
  // console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to services", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} -> it is currently ${body.current.temperature}ºC but it feels like ${body.current.feelslike}ºC out`
      );
    }
  });
};

module.exports = forecast;
