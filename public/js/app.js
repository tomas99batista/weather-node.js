console.log("loading js");
// http://puzzle.mead.io/puzzle

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  console.log(location);
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return console.log(`ERROR: ${data.error.error}`);
      }
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
      console.log(data.forecast);
      console.log(data.address);
      console.log(data.location);
    });
  });
});
