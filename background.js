
var url = chrome.runtime.getURL("sustainability.txt");
console.log(url);
var brandNames = {
"forever21": "Forever 21",
"jcrew": "J.Crew"
};
var brandScores = {};
$.get( url, function( data ) {
  var text = data;
  text = text.split("\n");
  console.log(text[0]);
  for (var i = 0; i < text.length; i++){
      console.log(text[i]);
    brandScores[text[i]] = text[i+1];
    i++;
  } 
  console.log(data);
  console.log(typeof(data))
  console.log(brandScores);
});

console.log("TEST");