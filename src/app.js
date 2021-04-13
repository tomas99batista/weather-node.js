const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// paths for config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setups
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

// index
app.get("/", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "tomas batista",
  });
});

// abouts
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "tomas batista",
  });
});

// help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "tomas batista",
    helpMessage: "switch on and off pls",
  });
});

// weather
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  console.log(address);
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    console.log(latitude, longitude, location);
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      console.log(forecastData);
      return res.send({
        forecast: forecastData,
        address: address,
        location: [latitude, longitude],
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "tomas batista",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "tomas batista",
    errorMessage: "page not found",
  });
});

// port
app.listen(port, () => {
  console.log(`server is up on port ${port}.`);
});
