const request = require("request");
var SearchButton = document.getElementById("youtubeSearch");
const API_KEY = "AIzaSyAIrylrJj_gzjIGMqDcjCP6fpn9gzkABEA";
SearchButton.addEventListener("click", () => {
  var q = document.getElementById("songSearch").innerHTML;
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${q}&type=video&key=${API_KEY}`, function (err, res, body) {
    console.log(res.body);
  });
});