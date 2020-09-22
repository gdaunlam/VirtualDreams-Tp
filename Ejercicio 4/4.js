var rp = require("request-promise");

var options = {
  uri: "https://reclutamiento-14cf7.firebaseio.com/personas.json",
};

rp(options)
  .then((res) => console.log(JSON.parse(res)))
  .catch((err) => console.log(err));
